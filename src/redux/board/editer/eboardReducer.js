import * as eService from '../../../pages/Main/Editer/EditerApiService';

// 액션
const MODE_GET_DATA = 'MODE_GET_DATA';
const MODE_FILTER_DATA = 'MODE_FILTER_DATA';
// 액션함수
// 마감순 정렬
export const getData = async (user_id, boardtype) => {
  const EBoard = await eService.fetchBoards(user_id, boardtype);
  return {
    type: MODE_GET_DATA,
    payload: EBoard.data,
  };
};

export const getFilterData = async (keyword) => {
  return {
    type: MODE_FILTER_DATA,
    keyword: keyword,
  };
};

// 초기값
const initialState = {
  eBoardData: [],
  filterData: [],
};

// 리듀서
export default function EboardReducer(state = initialState, action) {
  switch (action.type) {
    case MODE_GET_DATA:
      return {
        ...state,
        eBoardData: action.payload
          .sort((a, b) => b.updatedDate - a.updatedDate)
          .reverse(),
      };
    case MODE_FILTER_DATA:
      return {
        ...state,
        filterData: state.eBoardData.filter((data) => {
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
