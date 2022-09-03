import constants from "../constants/brand";
import axios from "axios";

export const getBrands = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.BRAND_ALL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/brands/`, config);
    dispatch({
      type: constants.BRAND_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.BRAND_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const actions = {
    getBrands,
    
};

export default actions;
