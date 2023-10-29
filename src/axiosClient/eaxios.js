import axios from "axios";
// import { logout, logoutMsg } from '../redux/actions/auth';

const TIMEOUT = 1 * 300 * 1000;

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  timeout: TIMEOUT,
});

export const setupAxiosClient = ({ dispatch, getState }, axiosInstance) => {
  const onRequestSuccess = (config) => {
    const sessionKey = getState().auth.token;
    if (sessionKey) config.headers["Authorization"] = `${sessionKey}`;
    return config;
  };

  const onRequestError = (error) => Promise.reject(error.response);
  const onResponseSucess = (response) => response;

  const onResponseError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        //dispatch(logout());
        //dispatch(logoutMsg('To protect your information, we’ve logged you out. When you are ready, please login again.'));
      }
      return Promise.reject(error.response);
    } else {
      return Promise.reject({
        data: {
          message:
            "Looks like the server is taking to long to respond, please try again in sometime.",
        },
      });
    }
  };

  axiosInstance.interceptors.request.use(onRequestSuccess, onRequestError);
  axiosInstance.interceptors.response.use(onResponseSucess, onResponseError);
};

export default instance;
