import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8888/api';

class YapiService {
  fetchUsers(board_id) {
    return axios.get(USER_API_BASE_URL + '/' + board_id);
  }
  addBoards(dita) {
    return axios.post(USER_API_BASE_URL + '/board', dita);
  }

  fetchBoards() {
    return axios.get(USER_API_BASE_URL + '/board');
  }
}

export default new YapiService();
