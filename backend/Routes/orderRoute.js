const express = require('express');
const {getOrders, newOrder} = require('../Controllers/order');
const {isAuthenticated, authoriseRole} = require('../middleware/auth');

const Router = express.Router();

Router.route('/').get(isAuthenticated, getOrders);
Router.route('/new').get(isAuthenticated, newOrder);

module.exports = Router;