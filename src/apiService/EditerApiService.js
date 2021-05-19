import instance from "../AxiosConfig.js";
import BoardTypeConvert from "../BoardTypeConvert.js";
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
  return await instance({
    url: board_type + "/board",
    method: "get",
  });
};

// 상세보기 1개만
export const fetchBoard = async (board_id, board_type) => {
  return await instance({
    url: board_type + "/board/" + board_id,
    method: "get",
  });
};

export const modifyBoard = async (board_id, data, board_type) => {
  return await instance({
    url: board_type + "/board/" + board_id,
    method: "put",
    data: data,
  });
};

export const deleteBoard = async (board_id, board_type) => {
  return await instance({
    url: board_type + "/board/" + board_id,
    method: "delete",
  });
};
