# interactive-web-app-full-stack

## About

A full stack web app which uses Mongo, Javascript, Node.js framework as backend tool for creating servers, APIs and http requests. All the requests were tested on Postman and works efficiently. It uses React, Bootstrap, HTML, CSS for frontend development. 

It is a simple small ecommerce website with 3 products in the database and has functionality of adding and removing products into wishlist and from wishlist respectively.

There are 2 seperate components of Products and Wishlists which are not linked at all and uses notification service to communicate in between. The notification service is built on Singleton design prinicple such that all of the components of the webapp is modularized and can be reused.

## Installation

Start your mongo server using:
'''
mongod
'''

In another terminal, run
'''
mongo
'''
and then just insert the data.json (swag-shop-web) into your database.

In swag-shop-api folder, run 
'''
node server.js
'''

In swag-shop-web folder, run
'''
npm install
npm start
'''

And watch the chrome browser open up to show the webapp.
