const Order = require('../Models/OrderModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// Admin Routes

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

exports.getOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler(`No order found with id ${req.params.id}`, 404));
    }
    res.status(200).json({
        status : true,
        order
    });
});

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
    const order = await Order.create({
        shippingInfo : shippingInfo,
        orderItems : orderItems,
        paymentInfo : paymentInfo,
        itemsPrice : itemsPrice,
        taxPrice : taxPrice,
        shippingPrice : shippingPrice,
        totalPrice : totalPrice,
        user : req.user._id,
    });

    res.status(200).json({
        status : true, 
        message : "Order Placed successfully",
        order
    });
});

exports.getAnOrder = catchAsyncError(async (req, res, next) => {

})

