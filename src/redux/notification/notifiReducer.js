import { fetchNotifications } from "../../apiService/MainApiService";

const GET_NOTIFY_REQUEST = "GET_NOTIFY_REQUEST";
const GET_NOTIFY_SUCCESS = "GET_NOTIFY_SUCCESS";
const GET_NOTIFY_FAILURE = "GET_NOTIFY_FAILURE";

export const getNotificationsData = (user_id = 0) => {
  return (dispatch) => {
    dispatch(getNotificationsRequest());
    fetchNotifications(user_id)
      .then((res) => dispatch(getNotificationsSuccess(res.data)))
      .catch((err) => dispatch(getNotificationsFailure(err.response)));
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

const initialState = {
  data: [
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

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFY_REQUEST:
      return {
        ...state,
      };
    case GET_NOTIFY_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case GET_NOTIFY_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default NotificationReducer;
