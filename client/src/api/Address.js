import axios from "axios";
const ADDRESS_API_ENDPOINT = "https://provinces.open-api.vn/api/";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Host": "provinces.open-api.vn",
  },
};
const addressApi = {
  getProvinces: () => {
    const url = ADDRESS_API_ENDPOINT + "p";
    return axios.get(url, config);
  },
  getDistricts: (provinceCode) => {
    const url = ADDRESS_API_ENDPOINT + `p/${provinceCode}/?depth=2`;
    return axios.get(url, config);
  },
  getWards: (districtCode) => {
    const url = ADDRESS_API_ENDPOINT + `d/${districtCode}/?depth=2`;
    return axios.get(url, config);
  },
};

export default addressApi;
