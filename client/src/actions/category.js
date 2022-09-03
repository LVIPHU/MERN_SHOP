import constants from "../constants/category";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: constants.CATEGORY_ALL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/categories/`, config);
    dispatch({
      type: constants.CATEGORY_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.CATEGORY_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCategoryDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.CATEGORY_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/categories/${id}`, config);
    dispatch({
      type: constants.CATEGORY_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.CATEGORY_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.CATEGORY_DELETE_REQUEST,
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

    await axios.delete(`/api/categories/${id}`, config);

    dispatch({
      type: constants.CATEGORY_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: constants.CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatedCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.CATEGORY_UPDATE_REQUEST,
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
      `/api/categories/${category._id}`,
      category,
      config
    );

    dispatch({
      type: constants.CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.CATEGORY_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/categories`, category, config);
    console.log(data);

    dispatch({
      type: constants.CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: constants.CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const actions = {
    getCategories,
    getCategoryDetail,
    deleteCategory,
    updatedCategory,
    createCategory,
};

export default actions;
