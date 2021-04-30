import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8888/api/';
const BoardType = 1;

class YapiService {
  async addBoards(dita) {
    return await axios.post(USER_API_BASE_URL + BoardType + '/board', dita);
  }

  async fetchBoards() {
    return await axios.get(USER_API_BASE_URL + BoardType + '/board');
  }

  // 상세보기 1개만
  async fetchBoard(board_id) {
    return await axios.get(
      USER_API_BASE_URL + BoardType + '/board/' + board_id
    );
  }

  async modifyBoard(board_id, data) {
    return await axios.put(
      USER_API_BASE_URL + BoardType + '/board/' + board_id,
      data
    );
  }

  async deleteBoard(board_id) {
    return await axios.delete(
      USER_API_BASE_URL + BoardType + '/board/' + board_id
    );
  }
}

export default new YapiService();
