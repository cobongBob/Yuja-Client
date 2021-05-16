import { getWinBoards, getWinOneBoard } from "../../../apiService/winBoardApiService";
import * as likeService from "../../../apiService/likeService";

const WADD_LIKE = "WADD_LIKE";
const WDELETE_LIKE = "WDELETE_LIKE";
const GET_WINBOARD_REQUEST = "GET_WINBOARD_REQUEST";
const GET_WINBOARD_SUCCESS = "GET_WINBOARD_SUCCESS";
const GET_WINBOARD_FAILURE = "GET_WINBOARD_FAILURE";
const GET_WDETAILS_DATA = "GET_WDETAILS_DATA";

export const getWinBoard = (board_type) => {
  return (dispatch) => {
    dispatch(getWinBoardRequest());
    getWinBoards(board_type)
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

export const getWDetailsData = async (board_id, board_type) => {
  const wDetailsData = await getWinOneBoard(board_id, board_type);
  return {
    type: GET_WDETAILS_DATA,
    payload: wDetailsData.data,
  };
};

export const wAddLike = async (board_id) => {
  await likeService.addLike(board_id);
  return {
    type: WADD_LIKE,
  };
};
export const wDeleteLike = async (board_id) => {
  await likeService.deleteLike(board_id);
  return {
    type: WDELETE_LIKE,
  };
};

const initialState = {
  loading: false,
  wBoards: [],
  wDetails: {
    title: "",
    content: "",
    likes: 0,
    liked: false,
    user: {
      id: 0,
    },
  },
  filterData: [],
  sortedCreated: false,
  sortedLike: false,
  sortedComment: false,
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
        ...state,
        loading: false,
        wBoards: action.payload.sort((a, b) => b.id - a.id),
        error: "",
      };
    case GET_WINBOARD_FAILURE:
      return {
        loading: false,
        wBoards: [],
        wDetails: {
          title: "",
          content: "",
          likes: 0,
          liked: false,
          user: {
            id: 0,
          },
        },
        filterData: [],
        sortedCreated: false,
        sortedLike: false,
        sortedComment: false,
        error: "",
      };
    case GET_WDETAILS_DATA:
      return {
        ...state,
        wDetails: action.payload,
      };
    case WADD_LIKE:
      return {
        ...state,
        wDetails: { ...state.wDetails, likes: state.wDetails.likes + 1, liked: true },
      };
    case WDELETE_LIKE:
      return {
        ...state,
        wDetails: { ...state.wDetails, likes: state.wDetails.likes - 1, liked: false },
      };
    default:
      return state;
  }
};

export default winBoardReducer;
