import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8888/api/get';

class YapiService {
  fetchUsers(board_id) {
    return axios.get(USER_API_BASE_URL + '/' + board_id);
  }
}

export default new YapiService();
