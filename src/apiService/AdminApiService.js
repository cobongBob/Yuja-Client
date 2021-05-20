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
