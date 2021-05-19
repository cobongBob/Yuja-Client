import instance from "../AxiosConfig.js";
import BoardTypeConvert from "../modules/BoardTypeConvert.js";
let board_code = 0;

class ImgApiService {
  async addImgs(data, config, board_type) {
    board_code = BoardTypeConvert(board_type);

    return await instance({ url: `${board_code}/board/img/upload`, method: "post", data: data, config: config });
  }
}

export default new ImgApiService();
