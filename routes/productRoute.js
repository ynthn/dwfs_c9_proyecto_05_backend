const express = require('express');
//const {auth, admin} = require('../middleware/auth')
const { 
    getProducts
} = require('../controllers/productController');

const productRouter = express.Router();


productRouter.route('/products')
    .get(getProducts);


module.exports = productRouter;