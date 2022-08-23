import fetch from "../service/upload";
import constants from "../constants/upload";

const uploadImage = (file) => async (dispatch) =>{
    try {
        dispatch({type: constants.UPLOAD_IMAGE_REQUEST})
        const {data} = await fetch.uploadImage(file);
        dispatch({
            type: constants.UPLOAD_IMAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: constants.UPLOAD_IMAGE_FAIL,
            payload: error.responce && error.responce.data.message 
            ? error.responce.data.message 
            : error.message
        })
    }
};

const deleteImage = (info) => async (dispatch) =>{
    try {
        dispatch({type: constants.DELETE_IMAGE_REQUEST})
        const {data} = await fetch.deleteImage(info);
        dispatch({
            type: constants.DELETE_IMAGE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: constants.DELETE_IMAGE_FAIL,
            payload: error.responce && error.responce.data.message 
            ? error.responce.data.message 
            : error.message
        })
    }
};

const uploadImageForDesc = (file) => async (dispatch) =>{
    try {
        dispatch({type: constants.UPLOAD_DESCRIPION_REQUEST})
        const {data} = await fetch.uploadImageForDesc(file);
        dispatch({
            type: constants.UPLOAD_DESCRIPION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: constants.UPLOAD_DESCRIPION_FAIL,
            payload: error.responce && error.responce.data.message 
            ? error.responce.data.message 
            : error.message
        })
    }
};

const actions = {
    uploadImage,
    deleteImage,
    uploadImageForDesc,
};
  
export default actions;