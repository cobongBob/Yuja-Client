import instance from "../../../AxiosConfig.js";

class ImgApiService {
  async addImgs(data, config) {
    return await instance({ url: "board/img/upload", method: "post", data: data, config: config });
  }
}

export default new ImgApiService();
