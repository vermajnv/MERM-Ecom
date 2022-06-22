const express = require('express');
const { getAllProducts, createProduct, deleteAProduct, updateProduct, getAProduct, createProductReview, getReview, deleteReview } = require('../Controllers/product');
const {isAuthenticated, authoriseRole} = require('../middleware/auth');

const Router = express.Router();

Router.route('/').get(isAuthenticated, authoriseRole("admin"), getAllProducts);
Router.route('/create').post(isAuthenticated, authoriseRole("admin"), createProduct);
Router.route('/add-review').put(isAuthenticated, createProductReview);
Router.route('/review/:productId').get(getReview).delete(deleteReview);
Router.route('/:id').delete(isAuthenticated, authoriseRole("admin"), deleteAProduct).put(isAuthenticated, authoriseRole("admin"), updateProduct).get(getAProduct);
module.exports = Router;