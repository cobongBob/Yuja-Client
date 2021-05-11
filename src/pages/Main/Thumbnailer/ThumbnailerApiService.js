import instance from '../../../AxiosConfig.js';
const BoardType = 3;

class ThumbnailerApiService {
  async addBoards(data) {
    return await instance({
      url: BoardType + '/board',
      method: 'post',
      data: data,
    });
  }

  async fetchBoards() {
    return await instance({ url: BoardType + '/board', method: 'get' });
  }

  // 상세보기 1개만
  async fetchBoard(board_id) {
    return await instance({
      url: BoardType + '/board/' + board_id,
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
}

export default new ThumbnailerApiService();
