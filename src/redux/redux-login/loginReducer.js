/* 유저 id 값 */

/* 액션 */
const USER_LOGIN = "redux-login/USER_LOGIN";
const USER_LOGOUT = "redux-login/USER_LOGOUT";
const USER_STATUS = "redux-login/USER_STATUS";
const USER_ID = "redux-login/USER_ID";

/* 액션 함수 */
export const userLogin = () => (
  console.log("액션함수 userLogin 실행"),
  {
    type: USER_LOGIN,
    userLoginStatus: true
  }
);
export const userLogout = () => (
  console.log("액션함수 userLogout 실행"),
  {
    type: USER_LOGOUT,
    userLoginStatus: false
  }
);
export const userId = () => (
  console.log("액션함수 userId 실행"),
  {
    type: USER_ID,
    userId: '',
    nickname: '',
  }
);
export const userStatus = () => (
  console.log('액션함수 userStatus 실행'), {
    type: USER_STATUS,
    userLoginStatus: initialState
  }
)

/* 초기값 */
const initialState = {
  userLoginStatus: false,
  userId: '',
  nickname: '',
};

/* 리듀서 */
export default function loginReducer(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userLoginStatus: true
      };
    case USER_LOGOUT:
      return {
        ...state,
        userLoginStatus: false
      };
    case USER_STATUS:
      return {
        ...state,
        userLoginStatus: state
      }
    case USER_ID:
      return {
        ...state,
        userId: '',
        nickname: '',
      }
    default:
      return state;
  }
}
