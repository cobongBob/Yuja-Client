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
import ImgPrac from "./components/Quill/practice/ImgPrac";
import ImgPracModi from "./components/Quill/practice/ImgPracModi";
import { useLocation } from "react-router-dom";
import MainWrapper from "./MainWrapper";
import PageNotFound from "./pages/Error/PageNotFound";
import Footer from "./components/Footer";

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

  return (
    <div>
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
          <Route path='/Winwin' component={Winwin} />
          <Route path='/Help' component={Help} />
          <Route path='/SignUp1' component={SignUp1} />
          <Route path='/YoutuberProfile' component={YoutuberProfile} />
          <Route path='/Ydetail/:board_id' component={Ydetail} />
          <Route path='/Yregister' component={Yregister} />
          <Route path='/YmodifyTest/:board_id' component={YmodifyTest} />
          <Route path='/Practice' component={ImgPrac} />
          <Route path='/PracticeModi/:board_id' component={ImgPracModi} />
          <Route path='/PageNotFound' component={PageNotFound} />
          {/* <Route component={PageNotFound} /> 이게 왜 나올까요? */}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
