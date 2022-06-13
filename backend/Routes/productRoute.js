const express = require('express');
const { getAllProducts, createProduct } = require('../Controllers/product');

const Router = express.Router();

Router.route('/').get(getAllProducts);
Router.route('/create').post(createProduct);
module.exports = Router;