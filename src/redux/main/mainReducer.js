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
  data: [],
  loading: false,
  error: '',
};

// 리듀서
const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case getDataSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case getDataFailure:
      return {
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default MainReducer;
