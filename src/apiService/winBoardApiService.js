import instance from "../AxiosConfig.js";
const BoardType = 4;

export const getWinBoards = async (user_id) => {
  return await instance({
    url: BoardType + "/board/" + user_id,
    method: "get",
  });
};
export const getWinOneBoard = async (board_id, user_id) => {
  return await instance({
    url: BoardType + "/board/" + board_id + "/" + user_id,
    method: "get",
  });
};
export const insertWinBoard = async (data) => {
  return await instance({
    url: BoardType + "/board",
    method: "post",
    data: data,
  });
};
export const modifyWinBoard = async (board_id, data) => {
  return await instance({
    url: BoardType + "/board/" + board_id,
    method: "put",
    data: data,
  });
};
export const deleteWinBoard = async (board_id) => {
  return await instance({
    url: BoardType + "/board/" + board_id,
    method: "delete",
  });
};
