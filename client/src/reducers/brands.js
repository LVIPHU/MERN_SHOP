import constants from "../constants/brand";

export const brandAllReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case constants.BRAND_ALL_REQUEST:
      return { loading: true, brands: [] };
    case constants.BRAND_ALL_SUCCESS:
      return { loading: false, brands: action.payload };
    case constants.BRAND_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const brandDetailReducer = (
  state = { brand: { products: [] } },
  action
) => {
  switch (action.type) {
    case constants.BRAND_DETAIL_REQUEST:
      return { loading: true, brand: { products: [] } };
    case constants.BRAND_DETAIL_SUCCESS:
      return { loading: false, brand: action.payload };
    case constants.BRAND_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const brandCreateReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case constants.BRAND_CREATE_REQUEST:
      return { loading: true };
    case constants.BRAND_CREATE_SUCCESS:
      return { loading: false, success: true, brand: action.payload };
    case constants.BRAND_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case constants.BRAND_CREATE_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const brandUpdateReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case constants.BRAND_UPDATE_REQUEST:
      return { loading: true };
    case constants.BRAND_UPDATE_SUCCESS:
      return { loading: false, success: true, brand: action.payload };
    case constants.BRAND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case constants.BRAND_UPDATE_RESET:
      return { brand: {} };
    default:
      return state;
  }
};

export const brandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.BRAND_DELETE_REQUEST:
      return { loading: true };
    case constants.BRAND_DELETE_SUCCESS:
      return { loading: false, success: true };
    case constants.BRAND_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case constants.BRAND_DELETE_RESET:
      return { success: false };
    default:
      return state;
  }
};
