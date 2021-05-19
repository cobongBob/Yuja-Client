import instance from '../AxiosConfig.js';
let board_code = 0;

export const addBoards = async (data, board_type) => {
  switch (board_type) {
    case 'Youtuber':
      board_code = 1;
      break;
    case 'Editor':
      board_code = 2;
      break;
    case 'Thumb':
      board_code = 3;
      break;
    case 'Winwin':
      board_code = 4;
      break;
    case 'Collabo':
      board_code = 5;
      break;
    case 'Notice':
      board_code = 6;
      break;
    default:
      board_code = 0;
  }
  return await instance({
    url: board_code + '/board',
    method: 'post',
    data: data,
  });
};

export const fetchBoards = async (board_type) => {
  switch (board_type) {
    case 'Youtuber':
      board_code = 1;
      break;
    case 'Editor':
      board_code = 2;
      break;
    case 'Thumb':
      board_code = 3;
      break;
    case 'Winwin':
      board_code = 4;
      break;
    case 'Collabo':
      board_code = 5;
      break;
    case 'Notice':
      board_code = 6;
      break;
    default:
      board_code = 0;
  }
  return await instance({
    url: board_code + '/board',
    method: 'get',
  });
};

// 상세보기 1개만
export const fetchBoard = async (board_id, board_type) => {
  switch (board_type) {
    case 'Youtuber':
      board_code = 1;
      break;
    case 'Editor':
      board_code = 2;
      break;
    case 'Thumb':
      board_code = 3;
      break;
    case 'Winwin':
      board_code = 4;
      break;
    case 'Collabo':
      board_code = 5;
      break;
    case 'Notice':
      board_code = 6;
      break;
    default:
      board_code = 0;
  }
  return await instance({
    url: board_code + '/board/' + board_id,
    method: 'get',
  });
};

export const modifyBoard = async (board_id, data, board_type) => {
  switch (board_type) {
    case 'Youtuber':
      board_code = 1;
      break;
    case 'Editor':
      board_code = 2;
      break;
    case 'Thumb':
      board_code = 3;
      break;
    case 'Winwin':
      board_code = 4;
      break;
    case 'Collabo':
      board_code = 5;
      break;
    case 'Notice':
      board_code = 6;
      break;
    default:
      board_code = 0;
  }
  return await instance({
    url: board_code + '/board/' + board_id,
    method: 'put',
    data: data,
  });
};

export const deleteBoard = async (board_id, board_type) => {
  switch (board_type) {
    case 'Youtuber':
      board_code = 1;
      break;
    case 'Editor':
      board_code = 2;
      break;
    case 'Thumb':
      board_code = 3;
      break;
    case 'Winwin':
      board_code = 4;
      break;
    case 'Collabo':
      board_code = 5;
      break;
    case 'Notice':
      board_code = 6;
      break;
    default:
      board_code = 0;
  }
  return await instance({
    url: board_code + '/board/' + board_id,
    method: 'delete',
  });
};
