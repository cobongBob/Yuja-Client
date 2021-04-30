import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8888/api/user';

class UserApiService {

  addUser(data) {
    return axios.get(USER_API_BASE_URL);
  }

}

export default new UserApiService();
