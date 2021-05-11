import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userLogout } from '../../../redux/redux-login/loginReducer';
const USER_API_BASE_URL = "http://localhost:8888/api/auth";

  export const verifyEmailSend = async (username) =>{
    return await axios.post(USER_API_BASE_URL + "/verify", { username: username });
  }

export const executeJwtAuthenticationService = async (data) => {
    return await axios.post(USER_API_BASE_URL + "/signin", data, { withCredentials: true });
  }

export const registerSuccessfulLoginForJwt = async (username, token) => {
    console.log("===registerSuccessfulLoginForJwt===");
    localStorage.setItem("token", token);
    localStorage.setItem("authenticatedUser", username);
  }

export const createJWTToken = (token) => {
    return "Bearer " + token;
  }

export const authLogout = () => {
    axios.get(USER_API_BASE_URL + "/signout", { withCredentials: true });
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token");
  }

export const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    console.log("===UserloggedInCheck===");
    console.log(token);
    console.log(localStorage.getItem("authenticatedUser"));

    if (token) {
      return true;
    }

    return false;
  }

export const getLoggedInUserName = () => {
    let user = localStorage.getItem("authenticatedUser");
    if (user === null) return "";
    return user;
  }
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
      // 이 데이터를 가지고 회원가입으로 이동
    } else if (resFromServer.status === 200) {
      const loginData = {
        username: resFromServer.data.email,
        password: resFromServer.data.password,
      };
      return loginData;
      // 이 데이터를 가지고 로그인으로 이동 후 자동 로그인
    }
  }

export const resetPasswordConfirmationService = async (username) => {
    await axios.post(USER_API_BASE_URL + "/resetPassword", username).then((res) => {
      alert(res.data);
    });
  }


