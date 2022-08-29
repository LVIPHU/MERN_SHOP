const asyncHandler = require("express-async-handler");
const Request = require("../model/request");
const User = require("../model/user");
const Product = require("../model/product")

// @desc    Request for becoming a new seller
// @route   POST /api/request/newRequest
// @access  Public
const addRequestItem = asyncHandler(async (req, res) => {
  const { brand, quantity, price, amount, product } = req.body;
  const user = req.user;
  if (!product && (quantity < 1)) {
    res.status(400);
    throw new Error("No request items");
  } else {
    const newRequest = {
      user: user._id,
      brand: brand,
      qty: quantity,
      price: price,
      amount: amount,
      product: product,
      requestAt: Date.now(),
    };
    const result = await Request.create(newRequest);
    if (result) {
      res.json(result);
    } else {
      res.status(404);
      throw new Error("Couldn't create new request");
    }
  }
});

// @desc    Get all the requests
// @route   POST /api/request/all
// @access  admin
const getAllRequest = asyncHandler(async (req, res) => {
  const result = await Request.find({}).populate("user", "id name");
  if (result) {
    res.json(result);
  } else {
    res.status(404);
    throw new Error("Couldn't get any requests");
  }
});

// @desc    Get request by id
// @route   GET /api/request/:id
// @access  admin
const getRequestById = asyncHandler(async (req, res) => {
  const re = await Request.findById(req.params.id).populate("product");
  // .populate("user", "id name");
  if (re) {
    res.json(re);
  } else {
    res.status(404);
    throw new Error("Couldn't find the request");
  }
});

// @desc    Approve seller request
// @route   PUT /api/request/approve/:id
// @access  admin
const approveUserRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);
  request = filter
  if (request) {
    const user = await User.findById(request.user._id);
    const requestItem = await Product.findById(request.product._id)
    if (user && requestItem ) {

      const { product } = request;
      let tempProduct = await Product.findById(product._id);
      tempProduct.countInStock += request.qty;
      await tempProduct.save();

      request.approved = true;
      request.approvedAt = Date.now();
      const approveRequest = await request.save();

      res.json(approveRequest);
    } else {
      res.status(404);
      throw new Error("content not found");
    }
  }
});

const controller = {
  addRequestItem,
  getAllRequest,
  getRequestById,
  approveUserRequest,
};

module.exports = controller;
