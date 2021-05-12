import YapiService from '../../../pages/Main/Youtuber/YapiService';

// 액션
const MODE_SORT_EXPIRED_DATE = 'sortExpiredDate';
const MODE_SORT_LIKES = 'sortLikes';
const MODE_GET_DATA = 'getData';
const MODE_GET_DETAIL_DATA = 'getDetailData';

// 액션함수

// 마감순 정렬
export const sortExpiredDate = async () => {
  const expiredData = await YapiService.fetchBoards();
  return {
    type: MODE_SORT_EXPIRED_DATE,
    payload: expiredData.data,
  };
};

// 인기순 정렬
export const sortLikes = async () => {
  const likesData = await YapiService.fetchBoards();
  return {
    type: MODE_SORT_LIKES,
    payload: likesData.data,
  };
};

// 전체데이터 가져오기
export const getData = async () => {
  const axiosData = await YapiService.fetchBoards();
  return {
    type: MODE_GET_DATA,
    payload: axiosData.data,
  };
};

export const getDetailData = async (board_id) => {
  const detailData = await YapiService.fetchBoard(board_id); // id를 넣어야 가져올꺼같긴한데...
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
};

// 리듀서
export default function YboardReducer(state = initialState, action) {
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
    case MODE_GET_DETAIL_DATA:
      return {
        ...state,
        detailData: action.data,
        count: state.detailData.liked === true ? true : false,
      };
    default:
      return state;
  }
}
