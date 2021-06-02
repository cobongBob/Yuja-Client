import axios from "axios";
import instance from "../AxiosConfig";

const USER_API_BASE_URL = "http://api.withyuja.com/api/auth";
const USER_API_BASE_USER_URL = "http://api.withyuja.com/api/user/";

class UserApiService {
  async addUser(data) {
    return await axios.post(USER_API_BASE_URL + "/signup", data);
  }

  async addProfileImg(data, config) {
    return await axios.post(USER_API_BASE_URL + "/profile", data, config);
  }

  async addYoutuberConfirmPic(data, config) {
    return await axios.post(USER_API_BASE_URL + "/youtubeconfirm", data, config);
  }

  async addYoutuberRequest(data) {
    return await axios.post(USER_API_BASE_URL + "/applyyoutuber", data);
  }

  async addUserRequest(data) {
    return await axios.post(USER_API_BASE_USER_URL + "likedBy", data);
  }
}

export default new UserApiService();

export const getUserProfileData = async (userId) => {
  return await instance({
    url: USER_API_BASE_USER_URL + "likedBy/" + userId,
    method: "get",
  });
};

export const getUserData = async (userId) => {
  return await instance({
    url: USER_API_BASE_USER_URL + userId,
    method: "get",
  });
};

export const modifyUserData = async (userId, data) => {
  return await instance({
    url: USER_API_BASE_USER_URL + userId,
    method: "put",
    data: data,
  });
};

export const deleteUser = async (id) => {
  return await instance({
    url: USER_API_BASE_USER_URL + id,
    method: "delete",
  });
};
