import React, { useCallback, useEffect, useRef, useState } from 'react';
import Logo from './components/Logo/Logo';
import './App.css';
import { Route, useHistory } from 'react-router';
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
import {
  ToastAlert,
  ToastCenter,
  ToastAlertNoDupl,
} from './modules/ToastModule';
import WModify from './pages/Main/Winwin/WModify';
import ThumbRegister from './pages/Main/Thumbnailer/ThumbRegister';
import ThumbDetail from './pages/Main/Thumbnailer/ThumbDetail';
import BeforeModify from './components/InfoModify/BeforeModify';
import Admin_main from './pages/Admin/Admin_main';
import PasswordModify from './components/InfoModify/PasswordModify';
import InfoModify from './components/InfoModify/InfoModify';
import EboardModify from './pages/Main/Editer/EboardModify';
import ThumbModify from './pages/Main/Thumbnailer/ThumbModify';
import SignOut from './components/SignOut/SignOut';
import { deleteNotifications } from './apiService/MainApiService';
import ChatModal from './pages/Main/components/Chat/ChatModal';
import { AiFillWechat } from 'react-icons/ai';
import { toastWithPush } from './modules/ToastWithPush';
import YoutuberRequest from './components/InfoModify/YoutuberRequest';
import { getAllNotifications } from './redux/loading/notiReducer';
import RouteIf from './routerif/RouteIf';
import ChatFrame from './pages/Main/components/NewChat/ChatFrame';
/* Logo 컴포넌트 제외할 페이지들 담아놓은 배열 */
const exceptArray = ['/SignUp1', '/SignUp1/Required', '/SignUp1/NonRequired'];

function App() {
  /* history 관련 */
  const location = useLocation();
  const history = useHistory();
  // const usePrevious = (value) => {
  //   const ref = React.useRef();
  //   React.useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // };
  // const prevLocation = usePrevious(location.pathname);
  /* history 관련 끝 */

  /* 로딩 */
  const dispatch = useDispatch();
  const { loading, notificationData } = useSelector(
    (state) => state.loadingReducer
  );
  const { allNotifications, notiLoading } = useSelector(
    (state) => state.NotiReducer
  );
  const { userData } = useSelector((state) => state.loginReducer);
  const { authorities } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    let pendingFroLoading = false;
    let pendingFroNotifications = false;
    instance.interceptors.request.use(
      function (config) {
        //로딩과 알림 호출
        if (userData && loading === false && !pendingFroLoading) {
          dispatch(getLoading(userData.id));
        }
        if (
          notiLoading === false &&
          userData &&
          userData.id > 0 &&
          !pendingFroNotifications
        ) {
          dispatch(getAllNotifications(userData.id));
        }
        pendingFroLoading = true;
        pendingFroNotifications = true;
        return config;
      },
      function (error) {
        //실패시 로딩창 종료
        dispatch(getLoaded());
        pendingFroLoading = false;
        pendingFroNotifications = false;
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (config) => {
        //완료시 로딩창 종료
        if (pendingFroLoading) {
          pendingFroLoading = false;
          dispatch(getLoaded());
        }
        if (pendingFroNotifications) {
          pendingFroNotifications = false;
        }
        return config;
      },
      (error) => {
        //실패시 로딩창 종료
        if (error.response && error.response.data) {
          ToastCenter(error.response.data.message);
        }
        dispatch(getLoaded());
        pendingFroLoading = false;
        pendingFroNotifications = false;
        return Promise.reject(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, dispatch]);

  /* 로딩 끝 */
  //알림
  useEffect(() => {
    if (
      notificationData.length > 0 &&
      notificationData[0].notiId !== 0 &&
      userData &&
      userData.id !== 0
    ) {
      notificationData.forEach((notification) => {
        if (
          notification.type === 'commentNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlert(() =>
            toastWithPush(
              `${notification.sender.nickname}님께서 ${notification.comment.board.title}글에 댓글을 남기셨습니다.`,
              notification,
              history
            )
          );
        } else if (
          notification.type === 'chatNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlertNoDupl(
            `${notification.sender.nickname}님으로부터 새로운 채팅이 있습니다.`
          );
        } else if (
          notification.type === 'editNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlertNoDupl(`에디터로 등록되셨습니다.`);
        } else if (
          notification.type === 'thumbNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlertNoDupl(`썸네일러로 등록되셨습니다.`);
        } else if (
          notification.type === 'youtubeNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlertNoDupl(`유튜버로 등록되셨습니다.`);
        } else if (
          notification.type === 'rejectNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlertNoDupl(
            `유튜버로 등록이 거절되었습니다. 신청 절차를 다시 확인해주세요.`
          );
        }
        if (notification.resipeint.id === userData.id) {
          deleteNotifications(notification.notiId);
        }
      });
    }
  }, [notificationData, userData, history]);
  //알림 설정 끝

  //채팅모달
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //자동로그아웃
  const signoutTime = useRef(1000 * 60 * 59 * 2); //1시간 58분
  let logoutTimeout = useRef();
  const logout = useCallback(() => {
    userLogout().then((res) => {
      dispatch(res);
      ToastAlert(`장시간 입력이 없어 안전하게 자동 로그아웃 되셨습니다.`);
    });
  }, [dispatch]);
  const setTimeouts = useCallback(() => {
    logoutTimeout.current = setTimeout(logout, signoutTime.current);
  }, [logout, signoutTime]);
  const clearTimeouts = useCallback(() => {
    if (logoutTimeout.current) clearTimeout(logoutTimeout.current);
  }, []);
  useEffect(() => {
    if (userData && userData.id > 0) {
      const events = ['load', 'click'];
      const resetTimeout = () => {
        clearTimeouts();
        setTimeouts();
      };
      for (let i in events) {
        window.addEventListener(events[i], resetTimeout);
      }
      setTimeouts();
      return () => {
        for (let i in events) {
          window.removeEventListener(events[i], resetTimeout);
          clearTimeouts();
        }
      };
    }
  }, [clearTimeouts, setTimeouts, userData]);
  //자동로그아웃 끝

  const role = [
    'STRANGER',
    'GENERAL',
    'YOUTUBER',
    'EDITOR',
    'THUMBNAILER',
    'MANAGER',
    'ADMIN',
  ];
  console.log(modalIsOpen);

  window.onkeydown = function (e) {
    if (e.keyCode == 27) {
      setModalIsOpen(false);
    }
  };

  return (
    <div>
      {userData && userData.id !== 0 && (
        <>
          <AiFillWechat
            className='chat_button'
            onClick={
              modalIsOpen === false
                ? () => setModalIsOpen(true)
                : () => setModalIsOpen(false)
            }
          />
          {modalIsOpen === true ? (
            <ChatFrame
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
            />
          ) : (
            ''
          )}
        </>
      )}
      {exceptArray.indexOf(location.pathname) < 0 && (
        <Navi allNotifications={allNotifications} />
      )}
      {exceptArray.indexOf(location.pathname) < 0 && <Logo />}
      <div>
        {loading && <Loader type='spin' color='#ff9411' />}
        <Switch>
          <Route exact path='/' component={MainWrapper} />
          <Route path='/YoutuberProfile' component={YoutuberProfile} />
          <Route path='/Youtuber/:current_page' component={Youtuber} />
          <Route path='/Ydetail/:board_id/:current_page' component={Ydetail} />
          {/* YOUTUBER or ADMIN */}
          <RouteIf
            path='/YoutuberRegister'
            exact
            component={Yregister}
            authorities={authorities}
            roles={[role[2], role[6]]} // path에 해당하는 권한
          />
          <RouteIf
            path='/YboardModify/:board_id/:current_page'
            exact
            authorities={authorities}
            roles={[role[2], role[6]]}
            component={YmodifyTest}
          />

          <Route path='/Eboard/:board_type/:current_page' component={Editer} />
          {/* GENERAL or ADMIN */}
          <RouteIf
            path='/EditorRegister/:board_type'
            exact
            component={EditorRegister}
            authorities={authorities}
            roles={[role[1], role[6]]}
          />
          <RouteIf
            path='/EboardModify/:board_type/:board_id/:current_page'
            component={EboardModify}
            authorities={authorities}
            roles={[role[3], role[6]]}
          />

          <Route
            path='/EDetail/:board_type/:board_id/:current_page'
            component={EDetail}
          />

          <Route
            path='/Thboard/:board_type/:current_page'
            component={Thumbnailer}
          />
          {/* GENERAL or ADMIN */}
          <RouteIf
            path='/ThumbRegister/:board_type'
            exact
            authorities={authorities}
            roles={[role[1], role[6]]}
            component={ThumbRegister}
          />
          <RouteIf
            path='/ThumbModify/:board_type/:board_id/:current_page'
            component={ThumbModify}
            authorities={authorities}
            roles={[role[4], role[6]]}
          />
          <Route
            path='/ThumbDetail/:board_type/:board_id/:current_page'
            component={ThumbDetail}
          />
          <Route
            path='/Community/:board_type/:current_page'
            component={Winwin}
          />
          {/* GENERAL or ADMIN */}
          <RouteIf
            path='/BoardRegister/:board_type'
            component={Wregister}
            authorities={authorities}
            roles={[role[1], role[6]]}
          />
          <RouteIf
            path='/BoardModify/:board_type/:board_id/:current_page'
            component={WModify}
            authorities={authorities}
            roles={[role[1], role[6]]}
          />

          <Route
            path='/BoardDetail/:board_type/:board_id/:current_page'
            component={Wdetail}
          />
          <Route path='/SignUp1' component={SignUp1} />
          <Route path='/FindPassword' component={FindPassword} />
          <Route path='/ResetPassword' component={ResetPassword} />
          <Route path='/BeforeModify' component={BeforeModify} />
          <Route path='/InfoModify' component={InfoModify} />
          <Route path='/PasswordModify' component={PasswordModify} />
          <Route path='/YoutuberRequest' component={YoutuberRequest} />
          <Route path='/Admin/:board_type' component={Admin_main} />
          <Route path='/Help' component={Help} />
          <Route path='/Chat' component={Chat} />
          <Route path='/SignOut' component={SignOut} />
          {/*<Route path='PageNotFound' component={PageNotFound} />*/}
          {/*<Redirect to='/' />*/}
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
