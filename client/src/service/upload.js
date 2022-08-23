import api from "../api/api";

const uploadImage = async (file) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await api.post("upload", file, config);
  return response;
};

const deleteImage = async (info) => {
  const response = await api.post("upload", info);
  return response;
};

const uploadImageForDesc = async (file) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await api.post("upload/descripion", file, config);
  return response;
};

const fetch = {
  uploadImage,
  deleteImage,
  uploadImageForDesc,
};

export default fetch;
