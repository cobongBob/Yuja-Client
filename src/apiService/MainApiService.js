import axios from 'axios';
import instance from '../AxiosConfig.js';

const USER_API_BASE_URL = 'http://localhost:8888/api/';

export const getfetchMainData = async () => {
  return await instance({
    url: '/main/board',
    method: 'get',
  });
};

export const fetchNotifications = async (user_id) => {
  if (!user_id) {
    user_id = 0;
  }
  if (user_id > 0) {
    return await axios.get(`${USER_API_BASE_URL}/notiUnread/${user_id}`, {
      withCredentials: true,
    });
  } else {
    return null;
  }
};

export const deleteNotifications = async (noti_id) => {
  return await axios.get(`${USER_API_BASE_URL}/notiread/${noti_id}`, {
    withCredentials: true,
  });
};

export const fetchAllNotifications = async (user_id) => {
  if (!user_id) {
    user_id = 0;
  }
  if (user_id !== 0) {
    return await axios.get(`${USER_API_BASE_URL}/findnoti/${user_id}`, {
      withCredentials: true,
    });
  }
};

export const removeNotiPermanently = async (noti_id) => {
  return await axios.delete(`${USER_API_BASE_URL}/deletenoti/${noti_id}`, {
    withCredentials: true,
  });
};
