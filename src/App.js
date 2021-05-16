import React from "react";
import Logo from "./components/Logo/Logo";
import "./App.css";
import { Route } from "react-router";
import Youtuber from "./pages/Main/Youtuber/Youtuber";
import Editer from "./pages/Main/Editer/Editer";
import Thumbnailer from "./pages/Main/Thumbnailer/Thumbnailer";
import Winwin from "./pages/Main/Winwin/Winwin";
import Help from "./pages/Main/Help/Help";
import Ydetail from "./pages/Main/Youtuber/Ydetail";
import SignUp1 from "./components/Login-SignUp/SignUp/SignUp1";
import { withRouter } from "react-router";
import Navi from "./components/Navi/Navi";
import YoutuberProfile from "./pages/Profile/YoutuberProfile";
import Yregister from "./pages/Main/Youtuber/Yregister";
import Switch from "react-bootstrap/Switch";
import YmodifyTest from "./pages/Main/Youtuber/YmodifyTest";
import { useLocation } from "react-router-dom";
import MainWrapper from "./MainWrapper";
import PageNotFound from "./pages/Error/PageNotFound";
import Footer from "./components/Footer";
import FindPassword from "./components/Login-SignUp/Login/FindPassword";
import { GLOBAL_LOADED, GLOBAL_LOADING } from "./redux/loading/loadingReducer";
import GlobalLoading from "./components/Loading/GlobalLoading";
import Wdetail from "./pages/Main/Winwin/Wdetail";
import Wregister from "./pages/Main/Winwin/Wregister";

/* Logo 컴포넌트 제외할 페이지들 담아놓은 배열 */
const exceptArray = ["/SignUp1", "/SignUp1/Required", "/SignUp1/NonRequired"];

function App() {
  /* history 관련 */
  const usePrevious = (value) => {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const location = useLocation();
  const prevLocation = usePrevious(location.pathname);
  /* history 관련 끝 */

  // /* 로딩 */
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   axios.interceptors.request.use(
  //     function (config) {
  //       //로딩 호출
  //       dispatch({
  //         type: GLOBAL_LOADING,
  //       });
  //       return config;
  //     },
  //     function (error) {
  //       //실패시 로딩창 종료
  //       dispatch({
  //         type: GLOBAL_LOADED,
  //       });
  //       return Promise.reject(error);
  //     }
  //   );
  //   axios.interceptors.response.use(
  //     (config) => {
  //       //완료시 로딩창 종료
  //       dispatch({
  //         type: GLOBAL_LOADED,
  //       });
  //       return config;
  //     },
  //     (error) => {
  //       //실패시 로딩창 종료
  //       dispatch({
  //         type: GLOBAL_LOADED,
  //       });
  //       return Promise.reject(error);
  //     }
  //   );
  // }, []);

  /* 로딩 끝 */

  return (
    <div>
      {/*<GlobalLoading/>*/}
      {exceptArray.indexOf(location.pathname) < 0 && <Navi />}
      {exceptArray.indexOf(location.pathname) < 0 && <Logo />}
      {console.log("전페이지", prevLocation)}
      {exceptArray.includes(prevLocation) === true && location.pathname === "/"
        ? console.log("회원가입에서 왔군")
        : console.log("그냥 왔군")}
      <div>
        <Switch>
          <Route exact path='/' component={MainWrapper} />
          <Route path='/Youtuber' component={Youtuber} />
          <Route path='/Editer' component={Editer} />
          <Route path='/Thumbnailer' component={Thumbnailer} />
          <Route path='/Community/:board_type' component={Winwin} />
          <Route path='/BoardDetail/:board_type/:board_id' component={Wdetail} />
          <Route path='/BoardRegister/:board_type' component={Wregister} />
          <Route path='/Help' component={Help} />
          <Route path='/SignUp1' component={SignUp1} />
          <Route path='/YoutuberProfile' component={YoutuberProfile} />
          <Route path='/Ydetail/:board_id' component={Ydetail} />
          <Route path='/Yregister' component={Yregister} />
          <Route path='/YmodifyTest/:board_id' component={YmodifyTest} />
          <Route path='/PageNotFound' component={PageNotFound} />
          <Route path='/FindPassword' component={FindPassword} />
          {/* <Route component={PageNotFound} /> 이게 왜 나올까요? */}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
