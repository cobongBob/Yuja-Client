import instance from "../AxiosConfig.js";
import BoardTypeConvert from "../modules/BoardTypeConvert.js";

export const fetchUsers = async () => {
  return await instance({
    url: "/user",
    method: "get",
  });
};
export const fetchAllUnauthYoutuber = async () => {
  return await instance({
    url: "/admin/promote/youtuber",
    method: "get",
  });
};

export const fetchAllNoticeBoards = async () => {
  return await instance({
    url: 9 + "/board",
    method: "get",
  });
};
export const fetchAllQnABoards = async () => {
  return await instance({
    url: 10 + "/board",
    method: "get",
  });
};

export const banUser = async (user_id) => {
  return await instance({
    url: `/banned/${user_id}`,
    method: "put",
  });
};
export const promoteUserService = async (data) => {
  return await instance({
    url: `/admin/promote/youtuber`,
    method: "post",
    data: data,
  });
};
export const rejectUserService = async (youtubeConfirmId) => {
  return await instance({
    url: `/admin/promote/youtuber/${youtubeConfirmId}`,
    method: "delete",
  });
};

export const deleteReportedBoard = async (board_id, board_type) => {
  let board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board/" + board_id,
    method: "delete",
  });
};

export const noticePrivateSwitch = async (board_id) => {
  return await instance({
    url: `/notice/private/${board_id}`,
  });
};

export const removeUserData = async (user_id) => {
  return await instance({
    url: `/user/remove/${user_id}`,
    method: "delete",
  });
};
