import instance from '../../../AxiosConfig.js';
const BoardType = 1;

class YapiService {
  async addBoards(data) {
    return await instance({
      url: BoardType + '/board',
      method: 'post',
      data: data,
    });
  }

  async fetchBoards(user_id) {
    return await instance({
      url: BoardType + '/board/' + user_id,
      method: 'get',
    });
  }

  // 상세보기 1개만
  async fetchBoard(board_id, user_id) {
    console.log(10101010101010, user_id);
    return await instance({
      url: BoardType + '/board/' + board_id + '/' + user_id,
      method: 'get',
    });
  }

  async modifyBoard(board_id, data) {
    return await instance({
      url: BoardType + '/board/' + board_id,
      method: 'put',
      data: data,
    });
  }

  async deleteBoard(board_id) {
    return await instance({
      url: BoardType + '/board/' + board_id,
      method: 'delete',
    });
  }

  async getliked() {
    return await instance({
      url: '/api/board/liked',
      method: 'post',
    });
  }
}

export default new YapiService();
