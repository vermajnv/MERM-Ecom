const Product = require('../Models/ProductModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ProductHelper = require('../Helpers/Product/ProductHelper');
// Create Products 

exports.createProduct = catchAsyncError (async (req, res, mext) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(200).json({
        success : true,
        product
    })
});

// Get all products
exports.getAllProducts = catchAsyncError (async (req, res, next) => {
    const productHelper = new ProductHelper(Product, req.query).search().filter().paginate(process.env.PAGINATION);
    const productCount = await Product.countDocuments();
    const products = await productHelper.query;
    res.status(200).json({
        success : true,
        count : productCount,
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

    req.body.updated_by = {"user" : req.user.id};
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


// Create/Update product Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const {rating, comment, productId} = req.body;
    const review = {
        rating : rating,
        comment : comment,
        user : req.user._id,
        name : req.user.name
    };
    let product = await Product.findById(productId);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    const isReviewed = product.reviews.find((review) => {
        return review.user.toString() === req.user._id.toString();
    });

    if(isReviewed)
    {
        product.reviews.forEach((review, index) => {
            (review.user.toString() === req.user._id.toString())
            {
                review.comment = comment;
                review.rating = rating;
            }
        });
    }
    else
    {
        product.reviews.push(review);
    }

    product = await product.save({
        validateBeforeSave : false,
        new : true
    });

    res.status(200).json({
        status : true,
        message : "Review Added successfully",
        product
    });
})