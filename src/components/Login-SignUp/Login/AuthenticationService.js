import axios from "axios";
const USER_API_BASE_URL = "http://localhost:8888/api/auth";

class AuthenticationService {
  verifyEmailSend(username) {
    return axios.post(USER_API_BASE_URL + "/verify", { username: username });
  }

  executeJwtAuthenticationService(data) {
    return axios.post(USER_API_BASE_URL + "/signin", data, { withCredentials: true });
  }

  registerSuccessfulLoginForJwt(username, token) {
    console.log("===registerSuccessfulLoginForJwt===");
    localStorage.setItem("token", token);
    localStorage.setItem("authenticatedUser", username);
  }

  createJWTToken(token) {
    return "Bearer " + token;
  }

  logout() {
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token");
  }

  isUserLoggedIn() {
    const token = localStorage.getItem("token");
    console.log("===UserloggedInCheck===");
    console.log(token);

    if (token) {
      return true;
    }

    return false;
  }

  getLoggedInUserName() {
    let user = localStorage.getItem("authenticatedUser");
    if (user === null) return "";
    return user;
  }
}

export default new AuthenticationService();
