import axios from "axios";
import instance from "../AxiosConfig.js";

export const getfetchMainData = async () => {
  return await instance({
    url: "main/board",
    method: "get",
  });
};

export const fetchNotifications = async (user_id) => {
  return await axios.get(`http://localhost:8888/api/notiUnread/${user_id}`, { withCredentials: true });
};
