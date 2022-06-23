const express = require('express');
const {getOrders, getOrder, newOrder, updateOrder, deleteOrder} = require('../Controllers/order');
const {isAuthenticated, authoriseRole} = require('../middleware/auth');

const Router = express.Router();

Router.route('/').get(isAuthenticated, authoriseRole("admin"), getOrders);
Router.route('/new').get(isAuthenticated, newOrder);
Router.route('/update/:id').put(isAuthenticated, authoriseRole("admin"), updateOrder);
Router.route('/delete/:id').delete(isAuthenticated, authoriseRole("admin"), deleteOrder);
Router.route('/:id').get(isAuthenticated, getOrder);

module.exports = Router;