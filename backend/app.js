const express = require('express');

const app = express();

// Routes For projects
const products = require('./Routes/productRoute');

app.use(express.json());

app.use('/api/v1/product', products);

module.exports = app;