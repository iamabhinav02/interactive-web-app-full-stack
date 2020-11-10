var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop', {useNewUrlParser: true, useUnifiedTopology: true});

var Product = require('./models/product');
var WishList = require('./models/wishlist');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/product', function(req, res) {
    var product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.save(function(err, savedProduct) {
        if (err) {
            res.send({error:"Could not save the product!"});
        } else {
            res.send(savedProduct);
        }
    });
    res.setHeader("Access-Control-Allow-Origin","*");
});

app.get('/product', function(req, res) {
    Product.find({}, function(err, products) {
        if (err) {
            res.send({error:"Could not fetch the products!"});
        } else {
            res.send(products);
        }
    });
    res.setHeader("Access-Control-Allow-Origin","*");
});

app.get('/wishlist', function(req, res) {
    WishList.find({}).populate({path:'products',model:'Product'}).exec(function(err, wishLists) {
        if (err) {
            res.status(500).send({error:"Could not fetch the wishlist!"});
        } else {
            res.send(wishLists);
        }
    });
    res.setHeader("Access-Control-Allow-Origin","*");
});

app.post('/wishlist', function(req, res) {
    var wishList = new WishList();
    wishList.title = req.body.title;
    wishList.save(function(err, newWishList) {
        if (err) {
            res.status(500).send({error:"Could not save the wishlist!"});
        } else {
            res.send(newWishList);
        }
    });
    res.setHeader("Access-Control-Allow-Origin","*");
});

app.put('/wishlist/product/add', function(req, res) {
    Product.findOne({_id: req.body.productId}, function(err, product) {
        if (err) {
            res.status(500).send({error:"Could not add item to wishlist!"});
        } else {
            WishList.update({_id:req.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList) {
                if (err) {
                    res.status(500).send({error:"Could not add item to wishlist!"});
                } else {
                    res.send("Successfully added in the wishlist. Yay!");
                }
        });
        }
    });
    res.setHeader("Access-Control-Allow-Origin","*");
});

app.listen(3000, function() {
    console.log('Swag Shop API running on port 3000...')
});
