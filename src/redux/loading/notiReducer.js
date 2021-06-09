import * as MainApiService from "../../apiService/MainApiService";

// 액션
const GET_NOTICES_REQUEST = "GET_NOTICES_REQUEST";
const GET_NOTICES_SUCCESS = "GET_NOTICES_SUCCESS";
const GET_NOTICES_FAILURE = "GET_NOTICES_FAILURE";
const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";

// 액션 함수

export const getAllNotifications = (user_id) => {
  return (dispatch) => {
    if (!user_id || user_id === 0) {
      dispatch(getNotificationsFailure(""));
    }
    dispatch(getNotificationsRequest());
    MainApiService.fetchAllNotifications(user_id)
      .then((res) => dispatch(getNotificationsSuccess(res.data)))
      .catch((err) => dispatch(getNotificationsFailure(err.response)));
  };
};
export const deleteNotification = (noti_id) => {
  MainApiService.removeNotiPermanently(noti_id);
  return {
    type: DELETE_NOTIFICATION,
    payload: noti_id,
  };
};
export const deleteNotificationWithoutAPI = (noti_id) => {
  return {
    type: DELETE_NOTIFICATION,
    payload: noti_id,
  };
};

const getNotificationsRequest = () => {
  return {
    type: GET_NOTICES_REQUEST,
  };
};

const getNotificationsSuccess = (data) => {
  return {
    type: GET_NOTICES_SUCCESS,
    payload: data,
  };
};

const getNotificationsFailure = (error) => {
  return {
    type: GET_NOTICES_FAILURE,
    payload: error,
  };
};

// 초기값
const initialState = {
  notiLoading: false,
  allNotifications: [],
  error: "",
};

// 리듀서
const NotiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTICES_REQUEST:
      return {
        ...state,
        notiLoading: true,
      };
    case GET_NOTICES_SUCCESS:
      return {
        allNotifications: action.payload,
        notiLoading: false,
        error: "",
      };
    case GET_NOTICES_FAILURE:
      return {
        allNotifications: [],
        error: action.payload,
        notiLoading: false,
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        allNotifications: state.allNotifications.filter((data) => data.notiId !== action.payload),
      };
    default:
      return state;
  }
};

export default NotiReducer;
