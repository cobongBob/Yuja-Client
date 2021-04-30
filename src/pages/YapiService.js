import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8888/api";

class YapiService {
  fetchUsers(board_id) {
    return axios.get(USER_API_BASE_URL + "/" + board_id);
  }
  addBoards(dita) {
    return axios.post(USER_API_BASE_URL + "/board", dita);
  }

  fetchBoards() {
    return axios.get(USER_API_BASE_URL + "/board");
  }

  fetchBoard(board_id) {
    return axios.get("http://localhost:8888/" + board_id);
  }

  modifyBoard(board_id, data) {
    return axios.put("http://localhost:8888/" + board_id, data);
  }

  deleteBoard(board_id) {
    return axios.delete("http://localhost:8888/" + board_id);
  }
}

export default new YapiService();
