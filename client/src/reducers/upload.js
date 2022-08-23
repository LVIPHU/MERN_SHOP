import constants from "../constants/upload";

export const uploadImage = (state = { image: {} }, action) => {
    switch (action.type) {
      case constants.UPLOAD_IMAGE_REQUEST:
        return { upLoadingImg: true };
      case constants.UPLOAD_IMAGE_SUCCESS:
        return { upLoadingImg: false, image: action.payload };
      case constants.UPLOAD_IMAGE_FAIL:
        return { upLoadingImg: false, error: action.payload };
      default:
        return state;
    }
};

export const deleteImage = (state = {}, action) => {
    switch (action.type) {
      case constants.DELETE_IMAGE_REQUEST:
        return { delLoadingImg: true };
      case constants.DELETE_IMAGE_SUCCESS:
        return { delLoadingImg: false, success: action.payload };
      case constants.DELETE_IMAGE_FAIL:
        return { delLoadingImg: false, error: action.payload };
      default:
        return state;
    }
};

export const uploadDecrepion = (state = { decrepion: {} }, action) => {
    switch (action.type) {
      case constants.UPLOAD_DESCRIPION_REQUEST:
        return { upLoadingDes: true };
      case constants.UPLOAD_DESCRIPION_SUCCESS:
        return { upLoadingDes: false, decrepion: action.payload };
      case constants.UPLOAD_DESCRIPION_FAIL:
        return { upLoadingDes: false, error: action.payload };
      default:
        return state;
    }
};

export const deleteDecrepion = (state = {}, action) => {
    switch (action.type) {
      case constants.DELETE_DESCRIPION_REQUEST:
        return { delLoadingDes: true };
      case constants.DELETE_DESCRIPION_SUCCESS:
        return { delLoadingDes: false, success: action.payload };
      case constants.DELETE_DESCRIPION_FAIL:
        return { delLoadingDes: false, error: action.payload };
      default:
        return state;
    }
};

// const uploadReducer = {
//     uploadImage,
//     deleteImage,
//     uploadDecrepion,
//     deleteDecrepion,
// };

// export default uploadReducer;