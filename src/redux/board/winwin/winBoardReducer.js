import { getWinBoards } from "../../../apiService/winBoardApiService";

const GET_WINBOARD_REQUEST = "GET_WINBOARD_REQUEST";
const GET_WINBOARD_SUCCESS = "GET_WINBOARD_SUCCESS";
const GET_WINBOARD_FAILURE = "GET_WINBOARD_FAILURE";

export const getWinBoard = (user_id) => {
  return (dispatch) => {
    dispatch(getWinBoardRequest());
    getWinBoards(user_id)
      .then((res) => dispatch(getWinBoardSuccess(res.data)))
      .catch((err) => dispatch(getWinBoardFailure(err.response.massage)));
  };
};

const getWinBoardRequest = () => {
  return {
    type: GET_WINBOARD_REQUEST,
  };
};
const getWinBoardSuccess = (boards) => {
  return {
    type: GET_WINBOARD_SUCCESS,
    payload: boards,
  };
};
const getWinBoardFailure = (error) => {
  return {
    type: GET_WINBOARD_FAILURE,
    payload: error,
  };
};

const initialState = {
  loading: false,
  wBoards: [],
  error: "",
};

const winBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WINBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WINBOARD_SUCCESS:
      return {
        loading: false,
        wBoards: action.payload.sort((a, b) => b.id - a.id),
        error: "",
      };
    case GET_WINBOARD_FAILURE:
      return {
        loading: false,
        wBoards: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default winBoardReducer;
