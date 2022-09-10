const asyncHandler = require("express-async-handler");
const Order = require("../model/order");
const Product = require("../model/product");
const User = require("../model/user");
const mailConfig = require('../config/mail.config');


// @desc    Create new order
// @route   POST /api/order
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrices,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    for (let i = 0; i < orderItems.length; i++) {
      let tempProduct = await Product.findById(orderItems[i].product);
      if (tempProduct.countInStock - orderItems[i].qty < 0) {
        res.status(400);
        throw new Error(`${tempProduct.name} is not in stock`);
      }
    }
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrices,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    if (order.paymentMethod === "COD") {
      const { orderItems } = order;
      for (let i = 0; i < orderItems.length; i++) {
        let tempProduct = await Product.findById(orderItems[i].product);
        tempProduct.countInStock -= orderItems[i].qty;
        await tempProduct.save();
      }
    }
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    GET order by ID
// @route   GET /api/order/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get orders of user
// @route   GET /api/order/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/order
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

// @desc    Update order to paid
// @route   PUT /api/order/:id
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    const { orderItems } = order;
    for (let i = 0; i < orderItems.length; i++) {
      let tempProduct = await Product.findById(orderItems[i].product);
      tempProduct.countInStock -= orderItems[i].qty;
      await tempProduct.save();
    }
    const user = await User.findById(req.user._id);
    const email = user.email;
    const mail = {
      to: email,
      subject: 'Send Invoice',
      html: mailConfig.htmlBill(order, email),
    };
    await mailConfig.sendEmail(mail);
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivering
// @route   PUT /api/orders/:id/delivering
// @access  Private/Admin
const updateOrderToDelivering = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivering = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (order) {
    if (order.paymentMethod === "COD") {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    if (order.paymentMethod === "PayPal") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (order.isDelivering) {
      res.status(400);
      throw new Error("can't cancel this order");
    } else {
      const { orderItems } = order;
      for (let i = 0; i < orderItems.length; i++) {
        let tempProduct = await Product.findById(orderItems[i].product);
        tempProduct.countInStock += orderItems[i].qty;
        await tempProduct.save();
      }
      order.isCancel = true;
      order.cancelAt = Date.now();
      const updatedOrder = await order.save();

      const user = await User.findById(req.user._id);
      const email = user.email;
      const mail = {
      to: email,
      subject: 'Cancel order success',
      html: mailConfig.htmlCancelOrder(user.name),
      };
      await mailConfig.sendEmail(mail);
      res.json(updatedOrder);
    }
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const controller = {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivering,
  updateOrderToDeliver,
  cancelOrder,
};

module.exports = controller;
