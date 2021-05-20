import * as auth from "../../apiService/AuthenticationService";

/* 액션 */
const USER_LOGIN = "userLogin";
const USER_LOGOUT = "userLogout";
const USER_CHECK = "userCheck";
const USER_STATUS = "userStatus";

/* 액션 함수 */
export const userLogin = async (loginData, setLoginValidateDesc) => {
  let userData = null;
  let result = false;
  await auth
    .executeJwtAuthenticationService(loginData)
    .then(async (res) => {
      userData = await auth.registerSuccessfulLoginForJwt(res.data);
      result = true;
    })
    .catch((e) => {
      setLoginValidateDesc(e.response.data.message);
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

/* 초기값 */
const initialState = {
  userLoginStatus: false,
  userData: "",
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
          action.payload.authorities &&
          action.payload.authorities.map((authority) => {
            return authority.authority;
          }),
      };
    case USER_LOGOUT:
      return {
        userLoginStatus: false,
        userData: "",
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
          action.payload.authorities &&
          action.payload.authorities.map((authority) => {
            return authority.authority;
          }),
      };
    default:
      return state;
  }
}
