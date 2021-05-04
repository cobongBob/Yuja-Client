import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8888/api/';
const BoardType = 2;

class EditorApiService {
  async getAllBoard() {
    return await axios.get(USER_API_BASE_URL + BoardType + '/board');
  }
}

export default new EditorApiService();
