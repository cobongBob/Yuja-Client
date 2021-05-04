import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8888/api/user';

class UserApiService {

  async addUser(data) {
    return await axios.post(USER_API_BASE_URL, data);
  }

  async addProfileImg(data, config) {
    return await axios.post(
      USER_API_BASE_URL + '/profile',
      data,
      config
    );
  }
}

export default new UserApiService();
