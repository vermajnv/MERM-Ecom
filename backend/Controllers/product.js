const Product = require('../Models/modelProducts');
const ErrorHandler = require('../utils/errorHandler');

// Create Products 

exports.createProduct = async (req, res, mext) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        success : true,
        product
    })
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success : true,
        products
    });
}

// Delete a product

exports.deleteAProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();
    res.status(200).json({
        success : true,
        message : "Product Deleted Successfully"
    })
}

// Update Product 

exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    product = await Product.findOneAndUpdate(req.params.id, req.body, {
        new : true, // Returns new collection with updated data
        runValidators : true,
    });

    res.status(200).json({
        success : true,
        product
    })
}

// Get A product

exports.getAProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success : true,
        product
    });
}