import axios from "axios";

export const getAuthToken = () => {
  return window.sessionStorage.getItem("auth_token");
};

export const setAuthHeader = (token) => {
  window.sessionStorage.setItem("auth_token", token);
};

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const request = (method, url, data) => {
  let headers = {
    headers: {},
  };
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    console.log("Found Auth Token");
    headers = { Authorization: `${getAuthToken()}` };
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  });
};
