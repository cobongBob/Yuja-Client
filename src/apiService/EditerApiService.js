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

export const getEBoards = async (board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board",
    method: "get",
  });
};

// 상세보기 1개만
export const getOneEBoard = async (board_id, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "get",
  });
};

export const modifyBoard = async (board_id, data, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "put",
    data: data,
  });
};
export const deleteBoard = async (board_id, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "delete",
  });
};

export const addThumb = async (data, config, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({ url: `${board_code}/thumbnail/upload`, method: "post", data: data, config: config });
};
