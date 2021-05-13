import instance from "../../../AxiosConfig.js";
const BoardType = 1;

export const addBoards = async (data) => {
  return await instance({
    url: BoardType + "/board",
    method: "post",
    data: data,
  });
};

export const fetchBoards = async (user_id) => {
  return await instance({
    url: BoardType + "/board/" + user_id,
    method: "get",
  });
};

// 상세보기 1개만
export const fetchBoard = async (board_id, user_id) => {
  return await instance({
    url: BoardType + "/board/" + board_id + "/" + user_id,
    method: "get",
  });
};

export const modifyBoard = async (board_id, data) => {
  return await instance({
    url: BoardType + "/board/" + board_id,
    method: "put",
    data: data,
  });
};

export const deleteBoard = async (board_id) => {
  return await instance({
    url: BoardType + "/board/" + board_id,
    method: "delete",
  });
};
export const getliked = async () => {
  return await instance({
    url: "/api/board/liked",
    method: "post",
  });
};
