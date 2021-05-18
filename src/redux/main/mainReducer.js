import * as MainApiService from '../../apiService/MainApiService';

// 액션
const MODE_GET_MAIN_DATA = 'getMainData';
const GET_MAIN_DATA_REQUEST = 'getDataRequest';
const GET_MAIN_DATA_SUCCESS = 'getDataSuccess';
const GET_MAIN_DATA_FAILURE = 'getDataFailure';

// 액션 함수

export const getMainData = () => {
  return (dispatch) => {
    dispatch(getDataRequest());
    MainApiService.getfetchMainData()
      .then((res) => dispatch(getDataSuccess(res.data)))
      .catch((err) => dispatch(getDataFailure(err.response)));
  };
};

export const getDataRequest = () => {
  return {
    type: GET_MAIN_DATA_REQUEST,
  };
};

export const getDataSuccess = (data) => {
  return {
    type: GET_MAIN_DATA_SUCCESS,
    payload: data,
  };
};

export const getDataFailure = (error) => {
  return {
    type: GET_MAIN_DATA_FAILURE,
    payload: error,
  };
};

// 초기값
const initialState = {
  EvideoData: [],
  ThvideoData: [],
  YmainList: [],
  EmainList: [],
  ThmainList: [],
  WmainList: [],
  CmainList: [],
};

// 리듀서
const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_DATA_REQUEST:
      return {
        ...state,
      };
    case GET_MAIN_DATA_SUCCESS:
      return {
        ...state,
        EvideoData: action.payload.editLikes12,
        ThvideoData: action.payload.thumbLikes12,
        YmainList: action.payload.youUpdatedOrder4,
        EmainList: action.payload.editUpdatedOrder4,
        ThmainList: action.payload.thumUpdatedOrder4,
        WmainList: action.payload.wincreatedOrder5,
        CmainList: action.payload.colcreatedOrder5,
      };
    case GET_MAIN_DATA_FAILURE:
      return {
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default MainReducer;
