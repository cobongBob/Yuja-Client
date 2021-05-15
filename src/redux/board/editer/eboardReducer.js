import * as eService from "../../../apiService/EditerApiService";

// 액션
const MODE_GET_EDETAIL_DATA = "getEDetailData";
const MODE_FILTER_DATA = "MODE_FILTER_DATA";
const MODE_SORTLIKE_DATA = "MODE_SORTLIKE_DATA";
const GET_EBOARD_REQUEST = "GET_EBOARD_REQUEST";
const GET_EBOARD_SUCCESS = "GET_EBOARD_SUCCESS";
const GET_EBOARD_FAILURE = "GET_EBOARD_FAILURE";
const MODE_RESET_DATA = "MODE_RESET_DATA";

// 액션함수

// 전체데이터 가져오기
export const getEBoards = (BoardType) => {
  return (dispatch) => {
    dispatch(getEBoardsRequest());
    eService
      .fetchBoards(BoardType)
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
    type: MODE_FILTER_DATA,
    keyword: keyword,
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
  const detailData = await eService.fetchBoard(board_id, user_id); // id를 넣어야 가져올꺼같긴한데...
  return {
    type: MODE_GET_EDETAIL_DATA,
    data: detailData.data,
    count: detailData.data.liked,
  };
};

// 초기값
const initialState = {
  eBoardData: [],
  detailData: { id: 0 },
  filterData: [],
  loading: false,
  sortedExpired: false,
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
        // eslint-disable-next-line array-callback-return
        filterData: action.payload.sort((a, b) => {
          if (a.updatedDate < b.updatedDate) return 1;
          if (a.updatedDate > b.updatedDate) return -1;
          if (a.updatedDate === b.updatedDate) return 0;
        }),
      };

    case GET_EBOARD_FAILURE:
      return {
        eBoardData: [],
        detailData: { id: 0 },
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
        filterData: state.eBoardData.filter((data) => {
          if (Object.values(data.title).join("").toLowerCase().includes(action.keyword.toLowerCase())) {
            return data;
          } else if (Object.values(data.user.username).join("").toLowerCase().includes(action.keyword.toLowerCase())) {
            return data;
          }
        }),
      };
    default:
      return state;
  }
}

export default EboardReducer;
