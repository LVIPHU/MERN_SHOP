import constants from "../constants/catelogy";

export const catelogyAllReducer = (state = { catelogies: [] }, action) => {
    switch (action.type) {
      case constants.CATELOGY_ALL_REQUEST:
        return { loading: true, catelogies: [] };
      case constants.CATELOGY_ALL_SUCCESS:
        return {
          
        };
      case constants.CATELOGY_ALL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const catelogyDetailReducer = (
    state = { catelogy: { products: [] } },
    action
  ) => {
    switch (action.type) {
      case constants.CATELOGY_DETAIL_REQUEST:
        return { loading: true, catelogy: { products: [] } };
      case constants.CATELOGY_UPDATE_SUCCESS:
        return { loading: false, catelogy: action.payload };
      case constants.CATELOGY_DETAIL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const catelogyCreateReducer = (state = { catelogy: {} }, action) => {
    switch (action.type) {
      case constants.CATELOGY_CREATE_REQUEST:
        return { loading: true };
      case constants.CATELOGY_CREATE_SUCCESS:
        return { loading: false, success: true, catelogy: action.payload };
      case constants.CATELOGY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case constants.CATELOGY_CREATE_RESET:
        return { success: false };
      default:
        return state;
    }};

  export const catelogyUpdateReducer = (state = { catelogy: {} }, action) => {
    switch (action.type) {
      case constants.CATELOGY_UPDATE_REQUEST:
        return { loading: true };
      case constants.CATELOGY_UPDATE_SUCCESS:
        return { loading: false, success: true, catelogy: action.payload };
      case constants.CATELOGY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case constants.CATELOGY_UPDATE_RESET:
        return { catelogy: {} };
      default:
        return state;
    }
  };

  export const catelogyDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case constants.CATELOGY_DELETE_REQUEST:
        return { loading: true };
      case constants.CATELOGY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case constants.CATELOGY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case constants.CATELOGY_DELETE_RESET:
        return { success: false };
      default:
        return state;
    }
  };
