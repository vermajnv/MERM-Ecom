const express = require('express');
const {getOrders, getOrder, newOrder} = require('../Controllers/order');
const {isAuthenticated, authoriseRole} = require('../middleware/auth');

const Router = express.Router();

Router.route('/').get(isAuthenticated, authoriseRole("admin"), getOrders);
Router.route('/new').get(isAuthenticated, newOrder);
Router.route('/:id').get(isAuthenticated, authoriseRole("admin"), getOrder);

module.exports = Router;