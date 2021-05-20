import { getWinBoards, getWinOneBoard } from "../../../apiService/winBoardApiService";

const GET_ADMINPAGE_REQUEST = "GET_ADMINPAGE_REQUEST";
const GET_ADMINPAGE_SUCCESS = "GET_ADMINPAGE_SUCCESS";
const GET_ADMINPAGE_FAILURE = "GET_ADMINPAGE_FAILURE";
const GET_ADMINPAGE_DETAIL = "GET_ADMINPAGE_DETAIL";
const GET_SEARCH_ADMINPAGE = "GET_SEARCH_ADMINPAGE";

export const getAdminPage = (board_type) => {
  return (dispatch) => {
    dispatch(getAdminPageRequest());
    getWinBoards()
      .then((res) => dispatch(getAdminPageSuccess(res.data)))
      .catch((err) => dispatch(getAdminPageFailure(err.response.massage)));
  };
};

export const getSearchAdminPage = async (keyword) => {
  return {
    type: GET_SEARCH_ADMINPAGE,
    keyword: keyword,
  };
};

const getAdminPageRequest = () => {
  return {
    type: GET_ADMINPAGE_REQUEST,
  };
};
const getAdminPageSuccess = (boards) => {
  return {
    type: GET_ADMINPAGE_SUCCESS,
    payload: boards,
  };
};
const getAdminPageFailure = (error) => {
  return {
    type: GET_ADMINPAGE_FAILURE,
    payload: error,
  };
};

export const getAdminPageDetail = async (board_id, board_type) => {
  const wDetailsData = await getWinOneBoard(board_id, board_type);
  return {
    type: GET_ADMINPAGE_DETAIL,
    payload: wDetailsData.data,
  };
};

const initialState = {
  loading: false,

  error: "",
};

const adminPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINPAGE_REQUEST:
      return {};
    case GET_ADMINPAGE_SUCCESS:
      return {};
    case GET_ADMINPAGE_FAILURE:
      return {};
    case GET_ADMINPAGE_DETAIL:
      return {};
    case GET_SEARCH_ADMINPAGE:
      return {};
    default:
      return state;
  }
};

export default adminPageReducer;
