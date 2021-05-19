import * as eService from "../../../apiService/EditerApiService";
import * as likeService from "../../../apiService/likeService";

// 액션
const ADD_LIKE = "ADD_LIKE";
const DELETE_LIKE = "DELETE_LIKE";
const MODE_GET_EDETAIL_DATA = "getEDetailData";
const MODE_EFILTER_DATA = "MODE_EFILTER_DATA";
const MODE_ESORTLIKE_DATA = "MODE_ESORTLIKE_DATA";
const GET_EBOARD_REQUEST = "GET_EBOARD_REQUEST";
const GET_EBOARD_SUCCESS = "GET_EBOARD_SUCCESS";
const GET_EBOARD_FAILURE = "GET_EBOARD_FAILURE";
const MODE_RESET_DATA = "MODE_RESET_DATA";

// 액션함수

// 전체데이터 가져오기
export const getEBoards = (board_type) => {
  return (dispatch) => {
    dispatch(getEBoardsRequest());
    eService
      .getEBoards(board_type)
      .then((res) => dispatch(getEBoardsSuccess(res.data)))
      .catch((err) => dispatch(getEBoardsFailure(err.response)));
  };
};

const getEBoardsRequest = () => {
  return {
    type: GET_EBOARD_REQUEST,
  };
};
const getEBoardsSuccess = (boards) => {
  return {
    type: GET_EBOARD_SUCCESS,
    payload: boards,
  };
};
const getEBoardsFailure = (error) => {
  return {
    type: GET_EBOARD_FAILURE,
    payload: error,
  };
};

// 필터로 보여줄 데이터
export const getFilterData = async (keyword) => {
  return {
    type: MODE_EFILTER_DATA,
    keyword: keyword,
  };
};
export const getSortLikeData = async () => {
  return {
    type: MODE_ESORTLIKE_DATA,
  };
};
export const getResetData = async () => {
  return {
    type: MODE_RESET_DATA,
  };
};

export const getDetailData = async (board_id, board_type) => {
  const detailData = await eService.getOneEBoard(board_id, board_type);
  return {
    type: MODE_GET_EDETAIL_DATA,
    data: detailData.data,
    count: detailData.data.liked,
  };
};

export const addLike = async (board_id) => {
  await likeService.addLike(board_id);
  return {
    type: ADD_LIKE,
    payload: board_id,
  };
};

export const deleteLike = async (board_id) => {
  await likeService.deleteLike(board_id);
  return {
    type: DELETE_LIKE,
    payload: board_id,
  };
};

// 초기값
const initialState = {
  eBoardData: [],
  detailData: { id: 0, likes: 0, liked: false, user: { id: 0 } },
  filterData: [],
  loading: false,
  sortedLike: false,
  error: "",
};

// 리듀서
export function EboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_EBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        eBoardData: action.payload,
        detailData: { id: 0, likes: 0, liked: false, user: { id: 0 } },
        // eslint-disable-next-line array-callback-return
        filterData: action.payload.sort((a, b) => {
          if (a.updatedDate < b.updatedDate) return 1;
          if (a.updatedDate > b.updatedDate) return -1;
          if (a.updatedDate === b.updatedDate) return 0;
        }),
        sortedLike: false,
        error: "",
      };

    case GET_EBOARD_FAILURE:
      return {
        eBoardData: [],
        detailData: { id: 0, likes: 0, liked: false, user: { id: 0 } },
        filterData: [],
        loading: false,
        sortedExpired: false,
        sortedLike: false,
        error: action.payload,
      };

    case MODE_GET_EDETAIL_DATA:
      return {
        ...state,
        detailData: action.data,
        count: state.detailData.liked === true ? true : false,
      };

    case MODE_RESET_DATA:
      return {
        ...state,
        // eslint-disable-next-line array-callback-return
        filterData: state.eBoardData.sort((a, b) => {
          if (a.updatedDate < b.updatedDate) return 1;
          if (a.updatedDate > b.updatedDate) return -1;
          if (a.updatedDate === b.updatedDate) return 0;
        }),
        sortedLike: false,
      };

    case MODE_ESORTLIKE_DATA:
      return {
        ...state,
        filterData: state.sortedLike
          ? state.filterData.sort((a, b) => a.likes - b.likes)
          : state.filterData.sort((a, b) => b.likes - a.likes),
        sortedLike: !state.sortedLike,
      };

    case MODE_EFILTER_DATA:
      return {
        ...state,
        // eslint-disable-next-line array-callback-return
        filterData: state.eBoardData.filter((data) => {
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
    case ADD_LIKE:
      return {
        ...state,
        detailData: {
          ...state.detailData,
          likes: state.detailData.likes + 1,
          liked: true,
        },
        filterData: state.filterData.map((data) => {
          if (data.id === action.payload) {
            data.likes += 1;
            data.liked = true;
          }
          return data;
        }),
      };
    case DELETE_LIKE:
      return {
        ...state,
        detailData: {
          ...state.detailData,
          likes: state.detailData.likes - 1,
          liked: false,
        },
        filterData: state.filterData.map((data) => {
          if (data.id === action.payload) {
            data.likes -= 1;
            data.liked = false;
          }
          return data;
        }),
      };
    default:
      return state;
  }
}

export default EboardReducer;
