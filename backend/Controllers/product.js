const Product = require('../Models/modelProducts');

// Create Products 

exports.createProduct = async (req, res, mext) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        success : true,
        product
    })
};

exports.getAllProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success : true,
        products
    });
}