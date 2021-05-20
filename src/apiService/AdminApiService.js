import instance from "../AxiosConfig.js";
let board_code = 8;

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
