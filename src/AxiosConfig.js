import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888/api/",
  timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
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
    // 로그인으로 이동
    return Promise.reject(error);
  }
);

export default instance;
