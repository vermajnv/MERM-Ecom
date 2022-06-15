const Product = require('../Models/modelProducts');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ProductHelper = require('../Helpers/Product/ProductHelper');
// Create Products 

exports.createProduct = catchAsyncError (async (req, res, mext) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        success : true,
        product
    })
});

// Get all products
exports.getAllProducts = catchAsyncError (async (req, res, next) => {
    const productHelper = new ProductHelper(Product, req.query).search().filter().paginate(process.env.PAGINATION);
    const products = await productHelper.query;
    res.status(200).json({
        success : true,
        products
    });
});

// Delete a product

exports.deleteAProduct = catchAsyncError (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();
    res.status(200).json({
        success : true,
        message : "Product Deleted Successfully"
    })
});

// Update Product 

exports.updateProduct = catchAsyncError (async (req, res, next) => {
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
});

// Get A product

exports.getAProduct = catchAsyncError (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success : true,
        product
    });
});