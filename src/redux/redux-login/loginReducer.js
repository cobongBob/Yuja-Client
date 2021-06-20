import * as auth from '../../apiService/AuthenticationService';

/* 액션 */
const USER_LOGIN = 'userLogin';
const USER_LOGOUT = 'userLogout';
const USER_CHECK = 'userCheck';
const USER_STATUS = 'userStatus';
const ADD_AUTHORITY = 'ADD_AUTHORITY';
const DELETE_AUTHORITY = 'DELETE_AUTHORITY';
const CHANGE_NICKNAME = 'CHANGE_NICKNAME';

/* 액션 함수 */
export const userLogin = async (loginData) => {
  let userData = null;
  let result = false;
  await auth
    .executeJwtAuthenticationService(loginData)
    .then(async (res) => {
      userData = await auth.registerSuccessfulLoginForJwt(res.data);
      result = true;
    })
    .catch((e) => {
      result = false;
    });
  return {
    type: USER_LOGIN,
    payload: userData,
    userLoginStatus: result,
  };
};
export const userLogout = async () => {
  await auth.authLogout();
  return {
    type: USER_LOGOUT,
    userLoginStatus: false,
  };
};
export const userStatus = async () => {
  return {
    type: USER_STATUS,
  };
};
export const userCheck = async () => {
  const userData = await auth.getLoggedInUserData();
  const isUserLoggedIn = await auth.isUserLoggedIn();
  return {
    type: USER_CHECK,
    payload: userData,
    userLoginStatus: isUserLoggedIn,
  };
};
export const addAuthority = async (newAuthority) => {
  return {
    type: ADD_AUTHORITY,
    payload: newAuthority,
  };
};
export const delAuthority = async (auth) => {
  return {
    type: DELETE_AUTHORITY,
    payload: auth,
  };
};

export const changeNickname = async (newData) => {
  return {
    type: CHANGE_NICKNAME,
    payload: newData,
  };
};

/* 초기값 */
const initialState = {
  userLoginStatus: false,
  userData: { id: 0 },
  authorities: [],
};

/* 리듀서 */
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userData: action.payload,
        userLoginStatus: action.userLoginStatus,
        authorities:
          action.payload &&
          action.payload.authorities &&
          action.payload.authorities.map((authority) => {
            return authority.authority;
          }),
      };
    case USER_LOGOUT:
      return {
        userLoginStatus: false,
        userData: { id: 0 },
        authorities: [],
      };
    case USER_STATUS:
      return {
        ...state,
      };
    case USER_CHECK:
      return {
        ...state,
        userData: action.payload,
        userLoginStatus: action.userLoginStatus,
        authorities:
          action.payload &&
          action.payload.authorities &&
          action.payload.authorities.map((authority) => {
            return authority.authority;
          }),
      };
    case ADD_AUTHORITY:
      return {
        ...state,
        authorities: state.authorities.concat(action.payload),
      };
    case DELETE_AUTHORITY:
      return {
        ...state,
        authorities: state.authorities.filter((auth) => auth !== action.payload),
      };
    case CHANGE_NICKNAME:
      return {
        ...state,
        userData: {
          ...state.userData,
          nickname: action.payload.nickname,
          profilePic: action.payload.profilePic,
        },
      };
    default:
      return state;
  }
}
