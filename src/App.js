import React, { useRef } from 'react';
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
import ImgPrac from "./components/Quill/practice/ImgPrac";
import ImgPracModi from "./components/Quill/practice/ImgPracModi";
import { useHistory, useLocation  } from 'react-router-dom'
import LoginModal from './components/Login-SignUp/Login/LoginModal';

const exceptArray = ["/SignUp1", "/SignUp1/Required", "/SignUp1/NonRequired"];

function App() {

  /* history 관련 */
  const usePrevious = (value) => {
    const ref = React.useRef()
    React.useEffect(() => { ref.current = value })
    return ref.current
  }

  const location = useLocation()
  const prevLocation = usePrevious(location.pathname)

  return (
    <div>
      {exceptArray.indexOf(location.pathname) < 0 && <Navi/>}
      {exceptArray.indexOf(location.pathname) < 0 && <Logo/>}
      {console.log("전페이지", prevLocation)}
      {exceptArray.includes(prevLocation) === true && location.pathname === '/' ?
        console.log('회원가입에서 왔군') : console.log('그냥 왔군')}
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
          <Route path='/Practice' component={ImgPrac} />
          <Route path='/PracticeModi/:board_id' component={ImgPracModi} />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(App);
