const Order = require('../Models/OrderModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('../Models/ProductModel');

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

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    let order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`No record found against id : ${req.body.id}`))
    }
    if(order.status === 'delivered')
    {
        return next(new ErrorHandler("Product already delivered", 404));
    }
    if(req.body.status === 'delivered')
    {
        await updateStock(order.orderItems);
    }
    order.status = req.body.status;
    order = await order.save({
        validateBeforeSave : false,
        new : true
    });

    res.status(200).json({
        status : true, 
        message : "Status updated successfully",
        order
    });
});

// User Routes

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

exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user : req.user._id});
    if(!orders) {
        return next(new ErrorHandler("No order found", 404));
    }

    res.status(200).json({
        status : true,
        orders
    });
});

const updateStock = async (orderItems) =>
{
    orderItems.forEach(async (item) => {
        const product = await Product.findById(item.product);
        product.stock = product.stock - item.quantity;
        await product.save();
    });
}