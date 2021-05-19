import instance from "../AxiosConfig.js";
import BoardTypeConvert from "../modules/BoardTypeConvert.js";
let board_code = 0;

export const addReport = async (data, board_type) => {
  board_code = BoardTypeConvert(board_type);
  return await instance({
    url: board_code + "/board",
    method: "post",
    data: data,
  });
};
