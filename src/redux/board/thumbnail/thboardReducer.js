import * as thService from '../../../apiService/ThumbnailerApiService';

// 액션
const MODE_GET_DATA = 'MODE_GET_DATA';
const MODE_FILTER_DATA = 'MODE_FILTER_DATA';
const MODE_SORT_LIKES = 'MODE_SORT_LIKES';

// 액션함수

// 전체데이터 가져오기
export const getData = async (user_id, boardtype) => {
  const axiosData = await thService.fetchBoards();
  return {
    type: MODE_GET_DATA,
    payload: axiosData.data,
  };
};

// 검색액션
export const getFilterData = async (keyword) => {
  return {
    type: MODE_FILTER_DATA,
    keyword: keyword,
  };
};

// 인기순 정렬
export const sortLikes = async () => {
  const likesData = await thService.fetchBoards();
  return {
    type: MODE_SORT_LIKES,
    payload: likesData.data,
  };
};

// 초기값
const initialState = {
  thBoardData: [],
  filterData: [],
};

// 리듀서
export default function ThboardReducer(state = initialState, action) {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case MODE_GET_DATA:
      return {
        ...state,
        thBoardData: action.payload
          .sort((a, b) => b.updatedDate - a.updatedDate)
          .reverse(),
      };
    case MODE_FILTER_DATA:
      return {
        ...state,
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
    default:
      return state;
  }
}
