import * as ThumbnailerApiService from '../../../apiService/ThumbnailerApiService';

// 액션
const MODE_SORT_EXPIRED_DATE = 'sortExpiredDate';
const MODE_SORT_LIKES = 'sortLikes';
const MODE_GET_DATA = 'getData';

// 액션함수
// 마감순 정렬
export const sortExpiredDate = async () => {
  const expiredData = await ThumbnailerApiService.fetchBoards();
  return {
    type: MODE_SORT_EXPIRED_DATE,
    payload: expiredData.data,
  };
};

// 인기순 정렬
export const sortLikes = async () => {
  const likesData = await ThumbnailerApiService.fetchBoards();
  return {
    type: MODE_SORT_LIKES,
    payload: likesData.data,
  };
};

export const getData = async () => {
  const axiosData = await ThumbnailerApiService.fetchBoards();
  return {
    type: MODE_GET_DATA,
    payload: axiosData.data,
  };
};

// 초기값
const initialState = {
  data: [],
};

// 리듀서
export default function ThboardReducer(state = initialState, action) {
  console.log(action.type);
  console.log(action.payload);
  switch (action.type) {
    case MODE_GET_DATA:
      return {
        ...state,
        data: action.payload
          .sort((a, b) => b.updatedDate - a.updatedDate)
          .reverse(),
      };
    case MODE_SORT_EXPIRED_DATE:
      return {
        ...state,
        data: action.payload
          .sort((a, b) => b.expiredDate - a.expiredDate)
          .reverse(),
      };
    case MODE_SORT_LIKES:
      return {
        ...state,
        data: action.payload.sort((a, b) => b.likes - a.likes),
      };
    default:
      return state;
  }
}
