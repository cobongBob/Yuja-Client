import instance from "../AxiosConfig.js";
let board_code = 0;

export const getWinBoards = async (board_type) => {
  if (board_type === "Winwin") {
    board_code = 4;
  }
  return await instance({
    url: board_code + "/board",
    method: "get",
  });
};
export const getWinOneBoard = async (board_id, board_type) => {
  if (board_type === "Winwin") {
    board_code = 4;
  }
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "get",
  });
};
export const insertWinBoard = async (data, board_type) => {
  if (board_type === "Winwin") {
    board_code = 4;
  }
  return await instance({
    url: board_code + "/board",
    method: "post",
    data: data,
  });
};
export const modifyWinBoard = async (board_id, data, board_type) => {
  if (board_type === "Winwin") {
    board_code = 4;
  }
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "put",
    data: data,
  });
};
export const deleteWinBoard = async (board_id, board_type) => {
  if (board_type === "Winwin") {
    board_code = 4;
  }
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "delete",
  });
};
