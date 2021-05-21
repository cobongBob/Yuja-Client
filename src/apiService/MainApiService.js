import instance from "../AxiosConfig.js";

export const getfetchMainData = async () => {
  return await instance({
    url: "main/board",
    method: "get",
  });
};

export const fetchNotifications = async (user_id) => {
  console.log("gigigigigigigigi");
  return await instance({
    url: `notiUnread/${user_id}`,
    method: "get",
  });
};
