import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8888/api/user';

class UserApiService {
  async addUser(data) {
    return await axios.post(USER_API_BASE_URL, data);
  }
}

export default new UserApiService();
