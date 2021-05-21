import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8888/api/auth";
const USER_API_BASE_USER_URL = "http://localhost:8888/api/user/";

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

}

export default new UserApiService();

export const getUserData = async (userId) => {
  return await axios.get(USER_API_BASE_USER_URL + userId);
}

export const modifyUserData = async (id) => {
  return await axios.put(USER_API_BASE_USER_URL + id);
}

export const deleteUser = async (id) => {
  return await axios.delete(USER_API_BASE_USER_URL + id);
}