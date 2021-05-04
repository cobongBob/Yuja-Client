import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8888/api/';
class ImgApiService {
  async addImgs(data, config) {
    return await axios.post(
      USER_API_BASE_URL + 'board/img/upload',
      data,
      config
    );
  }
}

export default new ImgApiService();
