import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.withyuja.com/api/",
  timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
  withCredentials: true,
});

export default instance;
