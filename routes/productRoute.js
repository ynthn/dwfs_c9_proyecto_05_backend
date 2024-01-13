const express = require('express');

const {
    getProducts,
    getProductById
} = require('../controllers/productController');

const productRouter = express.Router();


productRouter.route('/products')
    .get(getProducts);

productRouter.route("/product/:id")
    .get(getProductById);


module.exports = productRouter;