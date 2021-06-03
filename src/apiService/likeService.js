import instance from "../AxiosConfig.js";

export const addLike = async (board_id) => {
  return await instance({
    url: "board/liked/" + board_id,
    method: "post",
  });
};

export const deleteLike = async (board_id) => {
  return await instance({
    url: "board/liked/" + board_id,
    method: "delete",
  });
};
