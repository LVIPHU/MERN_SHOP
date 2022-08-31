const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const Verify = require('../model/verify');

const generateToken = require("../utils/generateToken");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const mailConfig = require('../config/mail.config');
const config = require('../config');
const helper = require('../helper');

// @desc    Register a new user
// @route   POST /api/user
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, verifyCode } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Please provide valid email");
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400);
    throw new Error(
      "At least 8 characters—the more characters, the better. \nA mixture of both uppercase and lowercase letters. A mixture of letters and numbers. Inclusion of at least one special character, e.g., ! @ # ? ]"
    );
  }
  // kiểm tra mã xác thực
  const isVerify = await helper.isVerifyEmail(email, verifyCode);
  if (!isVerify) {
    return res.status(400).json({ message: 'Mã xác nhận không hợp lệ !' });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      shippingAddress: user.shippingAddress,
      token: generateToken(user._id),
    });
    // xoá mã xác nhận
    await Verify.deleteOne({ email });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      shippingAddress: user.shippingAddress,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      shippingAddress: user.shippingAddress,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  private
const updateUserprofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const { address, city, postalCode, state, phone, fullname } = req.body;
    if (address) {
      user.shippingAddress.address = address;
    }
    if (city) {
      user.shippingAddress.city = city;
    }
    if (postalCode) {
      user.shippingAddress.postalCode = postalCode;
    }
    if (state) {
      user.shippingAddress.state = state;
    }
    if (phone) {
      user.shippingAddress.phone = phone;
    }
    if (fullname) {
      user.shippingAddress.fullname = fullname;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
      shippingAddress: updatedUser.shippingAddress,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new error("user not found");
  }
});

// @desc    Get all users
// @route   GET /api/users/profile
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User remove" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   DELETE /api/users/:id
// @access  Private/Admin
const getUserbyId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "-password -shippingAddress"
  );
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    update user
// @route   PUT /api/users/:id
// @access  private/admin
const updateUserbyId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || false;
    user.isSeller = req.body.isSeller || false;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
    });
  } else {
    res.status(401);
    throw new error("user not found");
  }
});

// @desc    Send a verify code
// @route   POST /api/user/verify
// @access  Public
const postSendVerifyCode = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email);
    //Kiểm tra tài khoản đã tồn tại hay chưa
    const account = await User.findOne({ email });

    //nếu tồn tại, thông báo lỗi, return
    if (account) {
      return res.status(400).json({ message: "Email đã được sử dụng !" });
    }

    //cấu hình email sẽ gửi
    const verifyCode = helper.generateVerifyCode(config.numberVerify);
    const mail = {
      to: email,
      subject: 'Mã xác thực tạo tài khoản',
      html: mailConfig.htmlSignupAccount(verifyCode),
    };

    //lưu mã vào database để xác thực sau này
    await Verify.findOneAndDelete({ email });
    await Verify.create({
      code: verifyCode,
      email,
      dateCreated: Date.now(),
    });

    //gửi mail
    const result = await mailConfig.sendEmail(mail);

    //if success
    if (result) {
      res.status(200).json(result);
    }
  else {
      res.status(400);
        throw new error('Send verify code failed !');
      
  }
});

// @desc    Send a verify code forgot password
// @route   POST /api/users/verify/forgot
// @access  Public
const postSendCodeForgotPW = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    //Kiểm tra tài khoản đã tồn tại hay chưa
    const account = await User.findOne({ email });

    //nếu tồn tại, thông báo lỗi, return
    if (!account)
      return res.status(406).json({ message: 'Tài khoản không tồn tại' });

    //cấu hình email sẽ gửi
    const verifyCode = helper.generateVerifyCode(config.numberVerify);
    const mail = {
      to: email,
      subject: 'Thay đổi mật khẩu',
      html: mailConfig.htmlResetPassword(verifyCode),
    };

    //lưu mã vào database để xác thực sau này
    await Verify.findOneAndDelete({ email });
    await Verify.create({
      code: verifyCode,
      email,
      dateCreated: Date.now(),
    });

    //gửi mail
    const result = await mailConfig.sendEmail(mail);

    //if success
    if (result) {
      return res.status(200).json({ message: 'success' });
    }
  } catch (error) {
    return res.status(409).json({
      message: 'Gửi mã thấy bại',
      error,
    });
  }
});

// @desc    Send a verify code forgot password
// @route   POST /api/users/reset-pw
// @access  private
const postResetPassword = asyncHandler(async (req, res) => {
  try {
    const { email, password, verifyCode } = req.body.account;

    // kiểm tra mã xác thực
    const isVerify = await helper.isVerifyEmail(email, verifyCode);

    if (!isVerify) {
      return res.status(401).json({ message: 'Mã xác nhận không hợp lệ.' });
    }
    //check userName -> hash new password -> change password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(
      password,
      salt
    );

    const response = await User.updateOne(
      { email },
      { password: hashPassword },
    );

    //check response -> return client
    if (response.n) {
      //xoá mã xác nhận
      await Verify.deleteOne({ email });
      return res.status(200).json({ message: 'Thay đổi mật khẩu thành công' });
    } else {
      return res.status(409).json({ message: 'Thay đổi mật khẩu thất bại' });
    }
  } catch (error) {
    return res.status(409).json({ message: 'Thay đổi mật khẩu thất bại' });
  }
});

const controller = {
  getUsers,
  getUserbyId,
  deleteUser,
  getUserProfile,
  updateUserprofile,
  updateUserbyId,
  // account
  login,
  signup,
  postSendVerifyCode,
  postSendCodeForgotPW,
  postResetPassword,
};

module.exports = controller;
