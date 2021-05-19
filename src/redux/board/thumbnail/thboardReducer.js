import * as thService from '../../../apiService/ThumbnailerApiService';
import * as likeService from '../../../apiService/likeService';

// 액션
const ADD_LIKE = 'ADD_LIKE';
const DELETE_LIKE = 'DELETE_LIKE';
const MODE_GET_THDETAIL_DATA = 'getThDetailData';
const MODE_THFILTER_DATA = 'MODE_THFILTER_DATA';
const MODE_THSORTLIKE_DATA = 'MODE_THSORTLIKE_DATA';
const GET_THBOARD_REQUEST = 'GET_THBOARD_REQUEST';
const GET_THBOARD_SUCCESS = 'GET_THBOARD_SUCCESS';
const GET_THBOARD_FAILURE = 'GET_THBOARD_FAILURE';
const MODE_RESET_DATA = 'MODE_RESET_DATA';

// 액션함수

// 전체데이터 가져오기
export const getThBoards = (board_type) => {
  return (dispatch) => {
    dispatch(getThBoardsRequest());
    thService
      .getThBoards(board_type)
      .then((res) => dispatch(getThBoardsSuccess(res.data)))
      .catch((err) => dispatch(getThBoardsFailure(err.response)));
  };
};
const getThBoardsRequest = () => {
  return {
    type: GET_THBOARD_REQUEST,
  };
};
const getThBoardsSuccess = (boards) => {
  return {
    type: GET_THBOARD_SUCCESS,
    payload: boards,
  };
};
const getThBoardsFailure = (error) => {
  return {
    type: GET_THBOARD_FAILURE,
    payload: error,
  };
};

// 필터로 보여줄 데이터
export const getFilterData = async (keyword) => {
  return {
    type: MODE_THFILTER_DATA,
    keyword: keyword,
  };
};
export const getSortLikeData = async () => {
  return {
    type: MODE_THSORTLIKE_DATA,
  };
};
export const getResetData = async () => {
  return {
    type: MODE_RESET_DATA,
  };
};

export const getDetailData = async (board_id, board_type) => {
  const detailData = await thService.getOneThBoard(board_id, board_type); // id를 넣어야 가져올꺼같긴한데...
  return {
    type: MODE_GET_THDETAIL_DATA,
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
  thBoardData: [],
  detailData: { id: 0, likes: 0, liked: false },
  filterData: [],
  loading: false,
  sortedLike: false,
  error: '',
};

// 리듀서
export function ThboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_THBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_THBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        eBoardData: action.payload,
        // eslint-disable-next-line array-callback-return
        filterData: action.payload.sort((a, b) => {
          if (a.updatedDate < b.updatedDate) return 1;
          if (a.updatedDate > b.updatedDate) return -1;
          if (a.updatedDate === b.updatedDate) return 0;
        }),
        sortedLike: false,
        error: '',
      };

    case GET_THBOARD_FAILURE:
      return {
        thBoardData: [],
        detailData: { id: 0 },
        filterData: [],
        loading: false,
        sortedExpired: false,
        sortedLike: false,
        error: action.payload,
      };

    case MODE_GET_THDETAIL_DATA:
      return {
        ...state,
        detailData: action.thBoardData,
        count: state.detailData.liked === true ? true : false,
      };

    case MODE_RESET_DATA:
      return {
        ...state,
        // eslint-disable-next-line array-callback-return
        filterData: state.thBoardData.sort((a, b) => {
          if (a.updatedDate < b.updatedDate) return 1;
          if (a.updatedDate > b.updatedDate) return -1;
          if (a.updatedDate === b.updatedDate) return 0;
        }),
      };

    case MODE_THSORTLIKE_DATA:
      return {
        ...state,
        filterData: state.sortedLike
          ? state.filterData.sort((a, b) => a.likes - b.likes)
          : state.filterData.sort((a, b) => b.likes - a.likes),
        sortedLike: !state.sortedLike,
        sortedExpired: false,
      };

    case MODE_THFILTER_DATA:
      return {
        ...state,
        // eslint-disable-next-line array-callback-return
        filterData: state.thBoardData.filter((data) => {
          if (
            Object.values(data.title)
              .join('')
              .toLowerCase()
              .includes(action.keyword.toLowerCase())
          ) {
            return data;
          } else if (
            Object.values(data.worker)
              .join('')
              .toLowerCase()
              .includes(action.keyword.toLowerCase())
          ) {
            return data;
          } else if (
            Object.values(data.user.username)
              .join('')
              .toLowerCase()
              .includes(action.keyword.toLowerCase())
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

export default ThboardReducer;
