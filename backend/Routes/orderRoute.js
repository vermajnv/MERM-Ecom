const express = require('express');
const {getOrders} = require('../Controllers/order');

const Router = express.Router();

Router.route('/').get(getOrders);

module.exports = Router;