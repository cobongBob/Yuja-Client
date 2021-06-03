import instance from "../AxiosConfig.js";
let board_code = 8;

export const addReport = async (data) => {
  return await instance({
    url: board_code + "/board",
    method: "post",
    data: data,
  });
};
export const fetchReports = async () => {
  return await instance({
    url: board_code + "/board",
    method: "get",
  });
};
