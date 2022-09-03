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

export const getBrandDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.BRAND_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/brands/${id}`, config);
    dispatch({
      type: constants.BRAND_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.BRAND_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBrand = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.BRAND_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/brands/${id}`, config);

    dispatch({
      type: constants.BRAND_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.BRAND_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatedBrand = (brand) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.BRAND_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/brands/${brand._id}`,
      brand,
      config
    );

    dispatch({
      type: constants.BRAND_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.BRAND_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBrand = (brand) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.BRAND_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/brands`, brand, config);
    console.log(data);

    dispatch({
      type: constants.BRAND_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.BRAND_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const actions = {
    getBrands,
    getBrandDetail,
    deleteBrand,
    updatedBrand,
    createBrand,
};

export default actions;
