import constants from "../constants/account";
import axios from "axios";

const sendVerifyCode = (email) => async (dispatch) => {
  try {
    dispatch({
      type: constants.SEND_VERIFY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/user/verify", { email }, config);
    console.log(data);
    dispatch({
      type: constants.SEND_VERIFY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.SEND_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const changePasswordCode = ( email, password, verifyCode ) => async (dispatch) => {
  try {
    dispatch({
      type: constants.CHANGE_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/user/reset-pw", { email, password, verifyCode }, config);
    console.log(data);
    dispatch({
      type: constants.CHANGE_PASSWORD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.CHANGE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const forgotPasswordCode = (email) => async (dispatch) => {
  try {
    dispatch({
      type: constants.FORGOT_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/user/verify/forgot", { email }, config);
    console.log(data);
    dispatch({
      type: constants.FORGOT_PASSWORD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const actions = {
  sendVerifyCode,
  changePasswordCode,
  forgotPasswordCode,
};

export default actions;
