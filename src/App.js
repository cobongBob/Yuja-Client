import React, { useEffect } from 'react';
import Logo from './components/Logo/Logo';
import './App.css';
import { Route } from 'react-router';
import Youtuber from './pages/Main/Youtuber/Youtuber';
import Editer from './pages/Main/Editer/Editer';
import Thumbnailer from './pages/Main/Thumbnailer/Thumbnailer';
import Winwin from './pages/Main/Winwin/Winwin';
import Help from './pages/Main/Help/Help';
import Ydetail from './pages/Main/Youtuber/Ydetail';
import SignUp1 from './components/Login-SignUp/SignUp/SignUp1';
import { withRouter } from 'react-router';
import Navi from './components/Navi/Navi';
import YoutuberProfile from './pages/Profile/YoutuberProfile';
import Yregister from './pages/Main/Youtuber/Yregister';
import Switch from 'react-bootstrap/Switch';
import YmodifyTest from './pages/Main/Youtuber/YmodifyTest';
import { useLocation } from 'react-router-dom';
import MainWrapper from './MainWrapper';
import PageNotFound from './pages/Error/PageNotFound';
import Footer from './components/Footer';
import FindPassword from './components/Login-SignUp/Login/FindPassword';
import Wdetail from './pages/Main/Winwin/Wdetail';
import Wregister from './pages/Main/Winwin/Wregister';
import EditorRegister from './pages/Main/Editer/EditorRegister';
import { useDispatch, useSelector } from 'react-redux';
import { getLoaded, getLoading } from './redux/loading/loadingReducer';
import Loader from './components/Loading/Loader';
import instance from './AxiosConfig';
import { userLogout } from './redux/redux-login/loginReducer';
import Chat from './pages/Main/components/Chat/Chat';
import EDetail from './pages/Main/Editer/EDetail';
import ResetPassword from './components/Login-SignUp/Login/ResetPassword';
import { ToastCenter } from './modules/ToastModule';
import WModify from './pages/Main/Winwin/WModify';
import ThumbRegister from './pages/Main/Thumbnailer/ThumbRegister';
import ThumbDetail from './pages/Main/Thumbnailer/ThumbDetail';
import BeforeModify from './components/InfoModify/BeforeModify';

/* Logo 컴포넌트 제외할 페이지들 담아놓은 배열 */
const exceptArray = ['/SignUp1', '/SignUp1/Required', '/SignUp1/NonRequired'];

function App() {
  //권한 alert

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

  /* 로딩 */
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    instance.interceptors.request.use(
      function (config) {
        //로딩 호출
        dispatch(getLoading());
        return config;
      },
      function (error) {
        //실패시 로딩창 종료
        dispatch(getLoaded());
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (config) => {
        //완료시 로딩창 종료
        dispatch(getLoaded());
        return config;
      },
      (error) => {
        //실패시 로딩창 종료
        if (error.response.status === 401) {
          userLogout().then((res) => {
            dispatch(res);
          });
        }
        if (error.response && error.response.data) {
          ToastCenter(error.response.data.message);
        }
        dispatch(getLoaded());
        return Promise.reject(error);
      }
    );
  }, [dispatch]);

  /* 로딩 끝 */

  return (
    <div>
      {exceptArray.indexOf(location.pathname) < 0 && <Navi />}
      {exceptArray.indexOf(location.pathname) < 0 && <Logo />}
      {console.log('전페이지', prevLocation)}
      {exceptArray.includes(prevLocation) === true && location.pathname === '/'
        ? console.log('회원가입에서 왔군')
        : console.log('그냥 왔군')}
      <div>
        {loading && loading.loading && <Loader type='spin' color='#ff9411' />}
        <Switch>
          <Route exact path='/' component={MainWrapper} />
          <Route path='/Youtuber' component={Youtuber} />
          <Route path='/Eboard/:board_type/:current_page' component={Editer} />
          <Route
            path='/Community/:board_type/:current_page'
            component={Winwin}
          />
          <Route
            path='/BoardDetail/:board_type/:board_id/:current_page'
            component={Wdetail}
          />
          <Route
            path='/BoardModify/:board_type/:board_id/:current_page'
            component={WModify}
          />
          <Route path='/BoardRegister/:board_type' component={Wregister} />
          <Route
            path='/Thboard/:board_type/:current_page'
            component={Thumbnailer}
          />
          <Route path='/ThumbRegister/:board_type' component={ThumbRegister} />
          <Route
            path='/ThumbDetail/:board_type/:board_id/:current_page'
            component={ThumbDetail}
          />
          <Route path='/Help' component={Help} />
          <Route path='/SignUp1' component={SignUp1} />
          <Route path='/YoutuberProfile' component={YoutuberProfile} />
          <Route path='/Ydetail/:board_id' component={Ydetail} />
          <Route path='/Yregister' component={Yregister} />
          <Route path='/YmodifyTest/:board_id' component={YmodifyTest} />
          <Route path='/PageNotFound' component={PageNotFound} />
          <Route
            path='/EditorRegister/:board_type'
            component={EditorRegister}
          />
          <Route path='/EDetail/:board_id' component={EDetail} />
          <Route path='/FindPassword' component={FindPassword} />
          <Route path='/ResetPassword' component={ResetPassword} />
          <Route path='/Chat' component={Chat} />
          <Route path='/BeforeModify' component={BeforeModify} />
          {/* <Route component={PageNotFound} /> 이게 왜 나올까요? */}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
