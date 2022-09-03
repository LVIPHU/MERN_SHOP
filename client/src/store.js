import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productTrendingReducer,
  productTopReducer,
  productDetailReducer,
  productAllReducer,
  reviewCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
  productCreateReducer,
  productForSellerReducer,
} from "./reducers/productReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducer";

import {
  sendVerifyCodeReducer,
  changePasswordReducer,
  forgotPasswordReducer,
} from "./reducers/account";

import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
  categoryAllReducer,
  categoryDetailReducer,
} from "./reducers/category";

import {
  brandCreateReducer,
  brandDeleteReducer,
  brandUpdateReducer,
  brandAllReducer,
  brandDetailReducer,
} from "./reducers/brands";

import { cartReducer } from "./reducers/cartReducer";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyListReducer,
  orderListsReducer,
  orderDeliverReducer,
} from "./reducers/orderReducer";

import {
  requestSellerReducer,
  getRequestSellerReducer,
  getRequestByIdReducer,
  approveRequestReducer,
} from "./reducers/requestReducer";

import {
  uploadImage,
  deleteImage,
  uploadDecrepion,
  deleteDecrepion, 
} from "./reducers/upload";

const resetEnhanser = (rootReducer) => (state, action) => {
  if (action.type !== "USER_LOGOUT") return rootReducer(state, action);
  const newState = rootReducer(undefined, {});
  newState.router = state.router;
  return newState;
};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const reducer = combineReducers({
  // Product reducers
  productTrending: productTrendingReducer,
  productTop: productTopReducer,
  productDetail: productDetailReducer,
  productAll: productAllReducer,
  productForSeller: productForSellerReducer,
  productReviewCreate: reviewCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,

  // User reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  // Account reducer
  sendVerifyCode: sendVerifyCodeReducer,
  changePassword: changePasswordReducer,
  forgotPassword: forgotPasswordReducer,

  // Category reducer
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryAll: categoryAllReducer,
  categoryDetail: categoryDetailReducer,

  // Brand reducer
  brandCreate: brandCreateReducer,
  brandDelete: brandDeleteReducer,
  brandUpdate: brandUpdateReducer,
  brandAll: brandAllReducer,
  brandDetail: brandDetailReducer,

  // Cart reducer
  cart: cartReducer,

  // Order reducer
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
  orderLists: orderListsReducer,
  orderDeliver: orderDeliverReducer,

  // Request reducer
  requestSeller: requestSellerReducer,
  getRequestSeller: getRequestSellerReducer,
  getRequestById: getRequestByIdReducer,
  approveRequest: approveRequestReducer,
  
  uploadImage: uploadImage,
  deleteImage: deleteImage,
  uploadDecrepion: uploadDecrepion,
  deleteDecrepion: deleteDecrepion
});

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  resetEnhanser(reducer),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
