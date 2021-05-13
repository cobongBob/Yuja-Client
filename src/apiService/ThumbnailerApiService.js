import instance from '../AxiosConfig.js';

export const addBoards = async (data, BoardType) => {
  return await instance({
    url: BoardType + '/board',
    method: 'post',
    data: data,
  });
};

export const fetchBoards = async (user_id, BoardType) => {
  return await instance({
    url: BoardType + '/board/' + user_id,
    method: 'get',
  });
};

// 상세보기 1개만
export const fetchBoard = async (board_id, user_id, BoardType) => {
  return await instance({
    url: BoardType + '/board/' + board_id + '/' + user_id,
    method: 'get',
  });
};

export const modifyBoard = async (board_id, data, BoardType) => {
  return await instance({
    url: BoardType + '/board/' + board_id,
    method: 'put',
    data: data,
  });
};

export const deleteBoard = async (board_id, BoardType) => {
  return await instance({
    url: BoardType + '/board/' + board_id,
    method: 'delete',
  });
};
