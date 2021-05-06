import axios from "axios";
const USER_API_BASE_URL = "http://localhost:8888/api/auth";

class AuthenticationService {
  executeJwtAuthenticationService(data) {
    return axios.post(USER_API_BASE_URL + "/signin", data);
  }

  registerSuccessfulLoginForJwt(username, token) {
    console.log("===registerSuccessfulLoginForJwt===");
    localStorage.setItem("token", token);
    localStorage.setItem("authenticatedUser", username);
    this.setupAxiosInterceptors();
  }

  createJWTToken(token) {
    return "Bearer " + token;
  }

  setupAxiosInterceptors() {
    console.log(11111);
    axios.interceptors.request.use(
      (config) => {
        console.log(22222, config);
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
          console.log(333333, config);
        }
        return config;
      },
      (error) => {
        console.log(333333, error);
        Promise.reject(error);
      }
    );
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
