import React from "react";
import Logo from "./components/Logo/Logo";
import VideoBox from "./pages/VideoBox/VideoBox";
import "./App.css";
import MainBoard from "./pages/Main/MainBoard";
import { Route } from "react-router";
import Youtuber from "./pages/Main/Youtuber/Youtuber";
import Editer from "./pages/Main/Editor/Editer";
import Thumbnailer from "./pages/Main/Thumbnailer/Thumbnailer";
import Winwin from "./pages/Main/Winwin/Winwin";
import Help from "./pages/Main/Help/Help";
import Wboard from "./components/MainBoard/Wboard";
import Ydetail from "./pages/Main/Youtuber/Ydetail";
import Footer from "./components/Footer";
import SignUp1 from "./components/Login-SignUp/SignUp/SignUp1";
import { withRouter } from "react-router";
import Navi from "./components/Navi/Navi";
import YoutuberProfile from "./pages/Profile/YoutuberProfile";
import Yregister from "./pages/Main/Youtuber/Yregister";
import Switch from "react-bootstrap/Switch";
import YmodifyTest from "./pages/Main/Modify/YmodifyTest";

const exceptArray = ["/SignUp1", "/SignUp1/Required", "/SignUp1/NonRequired"];

function App({ location }) {
  return (
    <div>
      <Navi></Navi>
      {exceptArray.indexOf(location.pathname) < 0 && <Logo />}
      <Route path='/' exact>
        <div className='allBoard'>
          <VideoBox></VideoBox>
          <MainBoard></MainBoard>
          <Wboard></Wboard>
        </div>
        <Footer></Footer>
      </Route>
      <div>
        <Switch>
          <Route path='/Youtuber' component={Youtuber} />
          <Route path='/Editer' component={Editer} />
          <Route path='/Thumbnailer' component={Thumbnailer} />
          <Route path='/Winwin' component={Winwin} />
          <Route path='/Help' component={Help} />
          <Route path='/Ydetail/:board_id' component={Ydetail} />
          <Route path='/SignUp1' component={SignUp1} />
          <Route path='/YoutuberProfile' component={YoutuberProfile} />
          <Route path='/Yregister' component={Yregister} />
          <Route path='/YmodifyTest/:board_id' component={YmodifyTest} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
