import constants from "../constants/account";

export const sendVerifyCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SEND_VERIFY_REQUEST:
      return { loading: true };
    case constants.SEND_VERIFY_SUCCESS:
      return { loading: false, success: true };
    case constants.SEND_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    case constants.SEND_VERIFY_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case constants.CHANGE_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case constants.CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case constants.CHANGE_PASSWORD_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case constants.FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case constants.FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case constants.FORGOT_PASSWORD_RESET:
      return { success: false };
    default:
      return state;
  }
};
