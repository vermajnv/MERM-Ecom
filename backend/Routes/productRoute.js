const express = require('express');
const { getAllProducts } = require('../Controllers/Products');

const Router = express.Router();

Router.route('/').get(getAllProducts);

module.exports = Router;