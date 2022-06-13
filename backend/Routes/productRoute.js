const express = require('express');
const { getAllProducts, createProduct, deleteAProduct, updateProduct, getAProduct } = require('../Controllers/product');

const Router = express.Router();

Router.route('/').get(getAllProducts);
Router.route('/create').post(createProduct);
Router.route('/:id').delete(deleteAProduct).put(updateProduct).get(getAProduct);
module.exports = Router;