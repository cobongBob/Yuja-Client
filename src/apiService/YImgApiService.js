import instance from "../AxiosConfig.js";
let board_code = 0;

class ImgApiService {
  async addImgs(data, config, board_type) {
    switch (board_type) {
      case "Youtuber":
        board_code = 1;
        break;
      case "Editor":
        board_code = 2;
        break;
      case "Thumb":
        board_code = 3;
        break;
      case "Winwin":
        board_code = 4;
        break;
      case "Collabo":
        board_code = 5;
        break;
      case "Notice":
        board_code = 6;
        break;
      default:
        board_code = 0;
    }

    return await instance({ url: `${board_code}/board/img/upload`, method: "post", data: data, config: config });
  }
}

export default new ImgApiService();
