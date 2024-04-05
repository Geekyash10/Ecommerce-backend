const Order = require('../models/orderModel')
const catchAsyncErrors = require('../middleware/cathAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const Product = require('../models/productModel')
// create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id,
        paidAt: Date.now()
    })
    res.status(201).json({
        success: true,
        order
    })
})
// get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email'); // populate se hoga ye ki user ka id nahi aayega name aur email aayega
    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        order
    })
})
// get loggedinUser orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json({
        success: true,
        orders
    })
})
// get all ordrs --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

}
)
// update orders status --Admin
exports.updateOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404))
    }
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })
    order.orderStatus = req.body.status;
    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    }
    )
})
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.Stock = product.Stock - quantity;
    await product.save({ validateBeforeSave: false });
}

// delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404))
    }
    await order.remove();
    res.status(200).json({
        success: true
    })
})