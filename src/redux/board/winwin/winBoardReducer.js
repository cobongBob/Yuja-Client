import { getWinBoards, getWinOneBoard } from "../../../apiService/winBoardApiService";
import * as likeService from "../../../apiService/likeService";

const WADD_LIKE = "WADD_LIKE";
const WDELETE_LIKE = "WDELETE_LIKE";
const GET_WINBOARD_REQUEST = "GET_WINBOARD_REQUEST";
const GET_WINBOARD_SUCCESS = "GET_WINBOARD_SUCCESS";
const GET_WINBOARD_FAILURE = "GET_WINBOARD_FAILURE";
const GET_WDETAILS_DATA = "GET_WDETAILS_DATA";
const GET_SEARCH_DATA = "GET_SEARCH_DATA";
const GET_SORTED_LIKE_DATA = "GET_SORTED_LIKE_DATA";
const GET_SORTED_HIT_DATA = "GET_SORTED_HIT_DATA";
const GET_SORTED_DATE_DATA = "GET_SORTED_DATE_DATA";
const GET_SORTED_COMMENT_DATA = "GET_SORTED_COMMENT_DATA";

export const getWinBoard = (board_type) => {
  return (dispatch) => {
    dispatch(getWinBoardRequest());
    getWinBoards(board_type)
      .then((res) => dispatch(getWinBoardSuccess(res.data)))
      .catch((err) => dispatch(getWinBoardFailure(err.response)));
  };
};

export const getSortedLikeWData = async () => {
  return {
    type: GET_SORTED_LIKE_DATA,
  };
};
export const getSortedHitWData = async () => {
  return {
    type: GET_SORTED_HIT_DATA,
  };
};
export const getSortedDateWData = async () => {
  return {
    type: GET_SORTED_DATE_DATA,
  };
};
export const getSortedCommentWData = async () => {
  return {
    type: GET_SORTED_COMMENT_DATA,
  };
};

export const getSearchData = async (keyword) => {
  return {
    type: GET_SEARCH_DATA,
    keyword: keyword,
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
  wFilterData: [],
  sortedwLike: false,
  sortedwComment: false,
  sortedwHit: false,
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
        wBoards: action.payload,
        wDetails: {
          title: "",
          content: "",
          likes: 0,
          liked: false,
          user: {
            id: 0,
          },
        },
        wFilterData: action.payload.sort((a, b) => b.id - a.id),
        sortedwLike: false,
        sortedwComment: false,
        sortedwHit: false,
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
        wFilterData: [],
        sortedwLike: false,
        sortedwComment: false,
        sortedwHit: false,
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
    case GET_SEARCH_DATA:
      return {
        ...state,
        // eslint-disable-next-line array-callback-return
        wFilterData: state.wBoards.filter((data) => {
          if (Object && Object.values(data.title).join("").toLowerCase().includes(action.keyword.toLowerCase())) {
            return data;
          } else if (
            Object &&
            Object.values(data.user.username).join("").toLowerCase().includes(action.keyword.toLowerCase())
          ) {
            return data;
          }
        }),
      };
    case GET_SORTED_DATE_DATA:
      return {
        ...state,
        // eslint-disable-next-line array-callback-return
        wFilterData: state.wBoards.sort((a, b) => b.id - a.id),
        sortedwLike: false,
        sortedwComment: false,
        sortedwHit: false,
      };
    case GET_SORTED_LIKE_DATA:
      return {
        ...state,
        wFilterData: state.sortedwLike
          ? state.wBoards.sort((a, b) => a.likes - b.likes)
          : state.wBoards.sort((a, b) => b.likes - a.likes),
        sortedwLike: !state.sortedwLike,
        sortedwComment: false,
        sortedwHit: false,
      };
    case GET_SORTED_COMMENT_DATA:
      return {
        ...state,
        wFilterData: state.sortedwComment
          ? state.wBoards.sort((a, b) => a.comments - b.comments)
          : state.wBoards.sort((a, b) => b.comments - a.comments),
        sortedwComment: !state.sortedwComment,
        sortedwLike: false,
        sortedwHit: false,
      };
    case GET_SORTED_HIT_DATA:
      return {
        ...state,
        wFilterData: state.sortedwHit
          ? state.wBoards.sort((a, b) => a.hit - b.hit)
          : state.wBoards.sort((a, b) => b.hit - a.hit),
        sortedwHit: !state.sortedwHit,
        sortedwLike: false,
        sortedwComment: false,
      };
    default:
      return state;
  }
};

export default winBoardReducer;
