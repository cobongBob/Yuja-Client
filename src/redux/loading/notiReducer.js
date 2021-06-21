import * as MainApiService from '../../apiService/MainApiService';

// 액션
const GET_NOTICES_REQUEST = 'GET_NOTICES_REQUEST';
const GET_NOTICES_SUCCESS = 'GET_NOTICES_SUCCESS';
const GET_NOTICES_FAILURE = 'GET_NOTICES_FAILURE';
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
const ADD_CHAT_NOTIFICATION = 'ADD_CHAT_NOTIFICATION';
// 액션 함수

export const getAllNotifications = (user_id) => {
  return (dispatch) => {
    if (!user_id || user_id === 0) {
      dispatch(getNotificationsFailure(''));
    }
    dispatch(getNotificationsRequest());
    MainApiService.fetchAllNotifications(user_id)
      .then((res) => dispatch(getNotificationsSuccess(res.data)))
      .catch((err) => dispatch(getNotificationsFailure(err.response)));
  };
};
export const deleteNotification = (noti_id) => {
  if (typeof noti_id !== 'string') {
    MainApiService.removeNotiPermanently(noti_id);
  }
  return {
    type: DELETE_NOTIFICATION,
    payload: noti_id,
  };
};

export const addChatNotification = (data) => {
  return {
    type: ADD_CHAT_NOTIFICATION,
    payload: data,
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
  error: '',
  chatNoti: [],
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
        ...state,
        allNotifications: action.payload.concat(...state.chatNoti),
        notiLoading: false,
        error: '',
      };
    case GET_NOTICES_FAILURE:
      return {
        allNotifications: [],
        error: action.payload,
        notiLoading: false,
        chatNoti: [],
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        allNotifications: state.allNotifications.filter((data) => {
          return data.notiId !== action.payload;
        }),
        chatNoti: state.chatNoti.filter((data) => {
          return data.notiId !== action.payload;
        }),
      };
    case ADD_CHAT_NOTIFICATION:
      if (state.chatNoti.filter((notice) => notice.notiId === action.payload.notiId).length === 0) {
        return {
          ...state,
          chatNoti: state.chatNoti.concat(action.payload),
          allNotifications: state.allNotifications.concat(...state.chatNoti.concat(action.payload)),
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default NotiReducer;
