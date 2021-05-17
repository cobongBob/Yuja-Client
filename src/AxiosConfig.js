import axios from "axios";
import { userLogout } from "./redux/redux-login/loginReducer";

const instance = axios.create({
  baseURL: "http://localhost:8888/api/",
  timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      userLogout();
    }
    return Promise.reject(error);
  }
);

export default instance;
