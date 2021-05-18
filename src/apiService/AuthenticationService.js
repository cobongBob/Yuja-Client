import axios from "axios";
const USER_API_BASE_URL = "http://localhost:8888/api/auth";

export const verifyEmailSend = async (username) => {
  return await axios.post(USER_API_BASE_URL + "/verify", { username: username });
};

export const resetPasswordEmailSend = async (username) => {
  return await axios.post(USER_API_BASE_URL + "/findPassword", { username: username });
};

export const resetPassword = async (username, password) => {
  return await axios.post(USER_API_BASE_URL + "/resetPassword", { username: username, password: password});
};

export const executeJwtAuthenticationService = async (data) => {
  return await axios.post(USER_API_BASE_URL + "/signin", data, { withCredentials: true });
};

export const registerSuccessfulLoginForJwt = (userData) => {
  console.log("===registerSuccessfulLoginForJwt===");
  sessionStorage.setItem("userData", JSON.stringify(userData));
  return userData;
};

export const authLogout = () => {
  axios.get(USER_API_BASE_URL + "/signout", { withCredentials: true });
  sessionStorage.removeItem("userData");
};

export const isUserLoggedIn = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData) {
    return true;
  }
  return false;
};

export const getLoggedInUserData = () => {
  let user = JSON.parse(sessionStorage.getItem("userData"));
  if (user === null) return "";
  return user;
};
export const googleLoginService = async (response) => {
  const resFromServer = await axios.post(USER_API_BASE_URL + "/oauth/google", JSON.stringify(response), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  if (resFromServer.status === 201) {
    const userDetail = {
      username: resFromServer.data.email,
      password: resFromServer.data.password,
      realName: resFromServer.data.name,
      provider: resFromServer.data.provider,
      providerId: resFromServer.data.providerId,
    };
    return userDetail;
  } else if (resFromServer.status === 200) {
    const loginData = {
      username: resFromServer.data.email,
      password: resFromServer.data.password,
      providerId: null,
    };
    return loginData;
    // 이 데이터를 가지고 로그인으로 이동 후 자동 로그인
  }
};

export const resetPasswordConfirmationService = async (username) => {
  await axios.post(USER_API_BASE_URL + "/resetPassword", username).then((res) => {
    alert(res.data);
  });
};
