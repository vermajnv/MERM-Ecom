const Order = require('../Models/OrderModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

exports.getOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    if(!orders)
    {
        return next(new ErrorHandler("No orders found.", 404));
    }
    res.status(200).json({
        status : true,
        orders
    });
});

exports.createOrder = catchAsyncError(async (req, res, next) => {

})

exports.getAnOrder = catchAsyncError(async (req, res, next) => {

})

