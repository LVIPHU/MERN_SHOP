const asyncHandler = require("express-async-handler");
const Request = require("../model/request");
const User = require("../model/user");
const Product = require("../model/product")

// @desc    Request for becoming a new seller
// @route   POST /api/request/newRequest
// @access  Public
const addRequestItem = asyncHandler(async (req, res) => {
  const { requestItems } = req.body;
  const user = req.user;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No request items");
  } else {
    const newRequest = {
      user: user._id,
      requestAt: Date.now(),
      requestItems: requestItems,
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
  if (request) {
    const user = await User.findById(request.user._id);
    const product = await Product.findById(request.requestItems.product._id)
    if (user && product) {
      request.approved = true;
      const approveRequest =await request.save();
      const { requestItems } = request;
      let tempProduct = await Product.findById(requestItems.product);
      tempProduct.countInStock += requestItems.qty;
      await tempProduct.save();
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
