import instance from "../AxiosConfig.js";
import BoardTypeConvert from "../modules/BoardTypeConvert.js";
let board_code = 0;

export const getWinBoards = async (board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board",
    method: "get",
  });
};
export const getWinOneBoard = async (board_id, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "get",
  });
};
export const insertWinBoard = async (data, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board",
    method: "post",
    data: data,
  });
};
export const modifyWinBoard = async (board_id, data, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "put",
    data: data,
  });
};
export const deleteWinBoard = async (board_id, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "delete",
  });
};

export const getWBoardWrittenBySelf = async (userId, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: `/user/board/${board_code}/${userId}`,
    method: "get",
  });
};
