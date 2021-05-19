import instance from "../AxiosConfig.js";
import BoardTypeConvert from "../modules/BoardTypeConvert.js";
let board_code = 0;

export const addBoards = async (data, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board",
    method: "post",
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
<<<<<<< HEAD
    url: board_code + '/board',
    method: 'get',
=======
    url: board_type + "/board",
    method: "get",
>>>>>>> cb0363d966bb195d9d67b0dcf9609f08bb3ac6ee
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
<<<<<<< HEAD
    url: board_code + '/board/' + board_id,
    method: 'get',
=======
    url: board_type + "/board/" + board_id,
    method: "get",
>>>>>>> cb0363d966bb195d9d67b0dcf9609f08bb3ac6ee
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
<<<<<<< HEAD
    url: board_code + '/board/' + board_id,
    method: 'put',
=======
    url: board_type + "/board/" + board_id,
    method: "put",
>>>>>>> cb0363d966bb195d9d67b0dcf9609f08bb3ac6ee
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
<<<<<<< HEAD
    url: board_code + '/board/' + board_id,
    method: 'delete',
=======
    url: board_type + "/board/" + board_id,
    method: "delete",
>>>>>>> cb0363d966bb195d9d67b0dcf9609f08bb3ac6ee
  });
};
