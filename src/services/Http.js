import axios from "axios";
import { BASE_API, BASE_URL } from "../shared/constants/app";
import store from "../redux-setup/store";
import { refreshToken } from "./Api";
import { refreshTokenSuccess, logout } from "../redux-setup/reducers/auth";

const Http = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});
let isLoggingOut = false;
Http.interceptors.request.use(
  async (config) => {
    const token = await store.getState().auth.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
Http.interceptors.response.use(
  (response) => {
    // console.log(response?.config?.url);

    return response;
  },
  async (error) => {
    const { config, response } = error;
    console.log(config);
    console.log(response);
    if (response.data?.message === "Access token expired") {
      if (config?.url.includes("auth/customers/refresh")) {
        return Promise.reject(error);
      }

      try {
        const newAccessToken = (await refreshToken()).data.accessToken;
        store.dispatch(refreshTokenSuccess({ newAccessToken }));

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return Http(config);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    if (response.data?.message === "Access Token has been revoked") {
      if (!isLoggingOut) {
        isLoggingOut = true;

        store.dispatch(logout());
        window.alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
export default Http;
