import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888/api/",
  timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
  withCredentials: true,
});

export default instance;
