import * as YapiService from "../../../pages/Main/Youtuber/YapiService";

// 액션
const MODE_GET_DETAIL_DATA = "getDetailData";
const MODE_FILTER_DATA = "MODE_FILTER_DATA";
const MODE_SORTEXDATE_DATA = "MODE_SORTEXDATE_DATA";
const MODE_SORTLIKE_DATA = "MODE_SORTLIKE_DATA";
const GET_YBOARD_REQUEST = "GET_YBOARD_REQUEST";
const GET_YBOARD_SUCCESS = "GET_YBOARD_SUCCESS";
const GET_YBOARD_FAILURE = "GET_YBOARD_FAILURE";
const MODE_RESET_DATA = "MODE_RESET_DATA";
// 액션함수
export const getYBoards = (user_id) => {
  return (dispatch) => {
    dispatch(getYBoardsRequest());
    YapiService.fetchBoards(user_id)
      .then((res) => dispatch(getYBoardsSuccess(res.data)))
      .catch((err) => dispatch(getYBoardsFailure(err.response.massage)));
  };
};
const getYBoardsRequest = () => {
  return {
    type: GET_YBOARD_REQUEST,
  };
};
const getYBoardsSuccess = (boards) => {
  return {
    type: GET_YBOARD_SUCCESS,
    payload: boards,
  };
};
const getYBoardsFailure = (error) => {
  return {
    type: GET_YBOARD_FAILURE,
    payload: error,
  };
};

// 필터로 보여줄 데이터
export const getFilterData = async (keyword) => {
  return {
    type: MODE_FILTER_DATA,
    keyword: keyword,
  };
};
export const getSortExData = async () => {
  return {
    type: MODE_SORTEXDATE_DATA,
  };
};
export const getSortLikeData = async () => {
  return {
    type: MODE_SORTLIKE_DATA,
  };
};
export const getResetData = async () => {
  return {
    type: MODE_RESET_DATA,
  };
};

export const getDetailData = async (board_id, user_id) => {
  const detailData = await YapiService.fetchBoard(board_id, user_id); // id를 넣어야 가져올꺼같긴한데...
  return {
    type: MODE_GET_DETAIL_DATA,
    data: detailData.data,
    count: detailData.data.liked,
  };
};

// 초기값
const initialState = {
  data: [],
  detailData: [],
  filterData: [],
  loading: false,
  sortedExpired: false,
  sortedLike: false,
  error: "",
};

// 리듀서
const YboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_YBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_YBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        // eslint-disable-next-line array-callback-return
        filterData: action.payload.sort((a, b) => {
          if (a.updatedDate < b.updatedDate) return 1;
          if (a.updatedDate > b.updatedDate) return -1;
          if (a.updatedDate === b.updatedDate) return 0;
        }),
      };
    case GET_YBOARD_FAILURE:
      return {
        data: [],
        detailData: [],
        filterData: [],
        loading: false,
        sortedExpired: false,
        sortedLike: false,
        error: action.payload,
      };
    case MODE_GET_DETAIL_DATA:
      return {
        ...state,
        detailData: action.data,
        count: state.detailData.liked === true ? true : false,
      };
    case MODE_RESET_DATA:
      return {
        ...state,
        // eslint-disable-next-line array-callback-return
        filterData: state.data.sort((a, b) => {
          if (a.updatedDate < b.updatedDate) return 1;
          if (a.updatedDate > b.updatedDate) return -1;
          if (a.updatedDate === b.updatedDate) return 0;
        }),
      };
    case MODE_SORTEXDATE_DATA:
      return {
        ...state,
        filterData: state.sortedExpired
          ? // eslint-disable-next-line array-callback-return
            state.filterData.sort((a, b) => {
              if (a.expiredDate < b.expiredDate) return 1;
              if (a.expiredDate > b.expiredDate) return -1;
              if (a.expiredDate === b.expiredDate) return 0;
            })
          : // eslint-disable-next-line array-callback-return
            state.filterData.sort((a, b) => {
              if (a.expiredDate < b.expiredDate) return -1;
              if (a.expiredDate > b.expiredDate) return 1;
              if (a.expiredDate === b.expiredDate) return 0;
            }),
        sortedExpired: !state.sortedExpired,
        sortedLike: false,
      };
    case MODE_SORTLIKE_DATA:
      return {
        ...state,
        filterData: state.sortedLike
          ? state.filterData.sort((a, b) => a.likes - b.likes)
          : state.filterData.sort((a, b) => b.likes - a.likes),
        sortedLike: !state.sortedLike,
        sortedExpired: false,
      };
    case MODE_FILTER_DATA:
      return {
        ...state,
        // eslint-disable-next-line array-callback-return
        filterData: state.data.filter((data) => {
          if (Object.values(data.title).join("").toLowerCase().includes(action.keyword.toLowerCase())) {
            return data;
          } else if (Object.values(data.worker).join("").toLowerCase().includes(action.keyword.toLowerCase())) {
            return data;
          } else if (Object.values(data.user.username).join("").toLowerCase().includes(action.keyword.toLowerCase())) {
            return data;
          }
        }),
      };
    default:
      return state;
  }
};
export default YboardReducer;
