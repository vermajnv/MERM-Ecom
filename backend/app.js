const express = require('express');
const errorMiddleware = require('./middleware/error');
const app = express();

// Routes For projects
const products = require('./Routes/productRoute');

app.use(express.json());

app.use('/api/v1/product', products);

// Middleware register
app.use(errorMiddleware);
module.exports = app;