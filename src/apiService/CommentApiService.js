import instance from "../AxiosConfig.js";

export const fetchComments = async (board_id) => {
  return await instance({
    url: "/comment/" + board_id,
    method: "get",
  });
};

export const insertComment = async (data) => {
  return await instance({
    url: "/comment",
    method: "post",
    data: data,
  });
};
export const updateComment = async (comment_id, data) => {
  return await instance({
    url: "/comment/" + comment_id,
    method: "put",
    data: data,
  });
};
export const deleteComment = async (comment_id) => {
  return await instance({
    url: "/comment/" + comment_id,
    method: "delete",
  });
};
