import { fetchNotifications } from "../../apiService/MainApiService";
/* 액션 */
const GLOBAL_LOADED = "GLOBAL_LOADED/LOADED";

const GET_NOTIFY_REQUEST = "GET_NOTIFY_REQUEST";
const GET_NOTIFY_SUCCESS = "GET_NOTIFY_SUCCESS";
const GET_NOTIFY_FAILURE = "GET_NOTIFY_FAILURE";

export const getLoading = (user_id) => {
  return (dispatch) => {
    dispatch(getNotificationsRequest());
    fetchNotifications(user_id)
      .then((res) => dispatch(getNotificationsSuccess(res.data)))
      .catch((err) => dispatch(getNotificationsFailure(err.response)));
  };
};

/* 액션 함수 */
export const getLoaded = () => {
  return {
    type: GLOBAL_LOADED,
  };
};

const getNotificationsRequest = () => {
  return {
    type: GET_NOTIFY_REQUEST,
  };
};
const getNotificationsSuccess = (data) => {
  return {
    type: GET_NOTIFY_SUCCESS,
    payload: data,
  };
};
const getNotificationsFailure = (error) => {
  return {
    type: GET_NOTIFY_FAILURE,
    error: error,
  };
};

/* 초기값 */
const initialState = {
  loading: false,
  notificationData: [
    {
      notiId: 0,
      sender: "",
      resipeint: "",
      type: "",
      readDate: "",
    },
  ],
  error: "",
};

/* 리듀서 */
export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTIFY_SUCCESS:
      return {
        ...state,
        notificationData: action.payload,
        loading: false,
      };
    case GET_NOTIFY_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case GLOBAL_LOADED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
