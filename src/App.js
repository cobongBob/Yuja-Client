import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Logo from './components/Logo/Logo';
import './App.css';
import { Redirect, Route, useHistory } from 'react-router';
import Youtuber from './pages/Main/Youtuber/Youtuber';
import Editer from './pages/Main/Editer/Editer';
import Thumbnailer from './pages/Main/Thumbnailer/Thumbnailer';
import Winwin from './pages/Main/Winwin/Winwin';
import Help from './pages/Main/Help/Help';
import Ydetail from './pages/Main/Youtuber/Ydetail';
import SignUp from './components/Login-SignUp/SignUp/SignUp';
import { withRouter } from 'react-router';
import Navi from './components/Navi/Navi';
import YoutuberProfile from './pages/Profile/YoutuberProfile';
import Yregister from './pages/Main/Youtuber/Yregister';
import Switch from 'react-bootstrap/Switch';
import YmodifyTest from './pages/Main/Youtuber/YmodifyTest';
import { useLocation } from 'react-router-dom';
import MainWrapper from './MainWrapper';
import Footer from './components/Footer';
import FindPassword from './components/Login-SignUp/Login/FindPassword';
import Wdetail from './pages/Main/Winwin/Wdetail';
import Wregister from './pages/Main/Winwin/Wregister';
import EditorRegister from './pages/Main/Editer/EditorRegister';
import { useDispatch, useSelector } from 'react-redux';
import { getLoaded, getLoading } from './redux/loading/loadingReducer';
import Loader from './components/Loading/Loader';
import instance from './AxiosConfig';
import {
  addAuthority,
  delAuthority,
  userLogout,
} from './redux/redux-login/loginReducer';
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
import { RiChat1Fill } from 'react-icons/ri';
import { toastWithPush } from './modules/ToastWithPush';
import YoutuberRequest from './components/InfoModify/YoutuberRequest';
import { getAllNotifications } from './redux/loading/notiReducer';
import RouteIf from './routerif/RouteIf';
import ChatFrame from './pages/Main/components/NewChat/ChatFrame';
import MyPage from './pages/MyPage/MyPage';
/* Logo 컴포넌트 제외할 페이지들 담아놓은 배열 */
const exceptArray = ['/SignUp', '/SignUp/Required', '/SignUp/NonRequired'];

function App() {
  const location = useLocation();
  const history = useHistory();
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
          if (
            error.response.data.message &&
            error.response.data.message.startsWith('해당글 없음')
          ) {
            history.push('/');
          } else if (
            error.response.data.message &&
            error.response.data.message.startsWith('이용이 정지된 계정입니다.')
          ) {
            userLogout().then((res) => {
              dispatch(res);
            });
          } else if (
            error.response.data.message &&
            error.response.data.message.startsWith('로그인 해주세요')
          ) {
            userLogout().then((res) => {
              dispatch(res);
            });
          }
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
              <ul
                style={{
                  listStyle: 'none',
                  paddingLeft: '0',
                  marginBottom: '0',
                }}
              >
                <li>{`${notification.comment.board.title}`}</li>
                <li>글에 댓글이 달렸습니다.</li>
              </ul>,
              notification,
              history
            )
          );
        } else if (
          notification.type === 'nestedComment' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlert(() =>
            toastWithPush(
              `${notification.sender.nickname}님께서 ${notification.comment.board.title}글의 댓글에 답글을 남기셨습니다.`,
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
          addAuthority('EDITOR').then((res) => {
            dispatch(res);
          });
        } else if (
          notification.type === 'thumbNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlertNoDupl(`썸네일러로 등록되셨습니다.`);
          addAuthority('THUMBNAILER').then((res) => {
            dispatch(res);
          });
        } else if (
          notification.type === 'youtubeNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlertNoDupl(`유튜버로 등록되셨습니다.`);
          addAuthority('YOUTUBER').then((res) => {
            dispatch(res);
          });
        } else if (
          notification.type === 'rejectNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlertNoDupl(
            `유튜버로 등록이 거절되었습니다. 신청 절차를 다시 확인해주세요.`
          );
        } else if (
          notification.type === 'editDelNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlert(`편집자 등록이 해제 되었습니다.`);
          delAuthority(`EDITOR`).then((res) => {
            dispatch(res);
          });
        } else if (
          notification.type === 'thumbDelNoti' &&
          notification.resipeint.id === userData.id
        ) {
          ToastAlert(`썸네일러 등록이 해제 되었습니다.`);
          delAuthority(`THUMBNAILER`).then((res) => {
            dispatch(res);
          });
        }
        if (notification.resipeint.id === userData.id) {
          deleteNotifications(notification.notiId);
        }
      });
    }
  }, [notificationData, userData, history, dispatch]);
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

  const role = useMemo(
    () => [
      'STRANGER',
      'GENERAL',
      'YOUTUBER',
      'EDITOR',
      'THUMBNAILER',
      'MANAGER',
      'ADMIN',
    ],
    []
  );

  window.onkeydown = useCallback((e) => {
    if (e.keyCode === 27) {
      setModalIsOpen(false);
    }
  }, []);

  return (
    <div>
      {userData && userData.id !== 0 && (
        <>
          <RiChat1Fill
            className={
              allNotifications &&
              allNotifications.find((noti) => noti.type === 'chatNoti')
                ? 'chat_button_noti'
                : 'chat_button'
            }
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
        <Navi
          allNotifications={allNotifications}
          setModalIsOpen={setModalIsOpen}
        />
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
            roles={[role[2], role[5], role[6]]}
            component={YmodifyTest}
          />
          <Route path='/Eboard/:board_type/:current_page' component={Editer} />
          {/* GENERAL or ADMIN */}
          <RouteIf
            path='/EditorRegister/:board_type'
            exact
            component={EditorRegister}
            authorities={authorities}
            roles={[role[1], role[5], role[6]]}
          />
          <RouteIf
            path='/EboardModify/:board_type/:board_id/:current_page'
            component={EboardModify}
            authorities={authorities}
            roles={[role[3], role[5], role[6]]}
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
            roles={[role[1], role[5], role[6]]}
            component={ThumbRegister}
          />
          <RouteIf
            path='/ThumbModify/:board_type/:board_id/:current_page'
            component={ThumbModify}
            authorities={authorities}
            roles={[role[4], role[5], role[6]]}
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
            roles={[role[1], role[5], role[6]]}
          />
          <RouteIf
            path='/BoardModify/:board_type/:board_id/:current_page'
            component={WModify}
            authorities={authorities}
            roles={[role[1], role[5], role[6]]}
          />
          <Route
            path='/BoardDetail/:board_type/:board_id/:current_page'
            component={Wdetail}
          />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/FindPassword' component={FindPassword} />
          <Route path='/ResetPassword' component={ResetPassword} />
          <Route path='/BeforeModify' component={BeforeModify} />
          <Route path='/InfoModify' component={InfoModify} />
          <Route path='/PasswordModify' component={PasswordModify} />
          <RouteIf
            path='/YoutuberRequest'
            component={YoutuberRequest}
            authorities={authorities}
            roles={[role[1], role[3], role[4], role[5], role[6]]}
          />
          <RouteIf
            path='/Admin/:board_type'
            component={Admin_main}
            authorities={authorities}
            roles={[role[5], role[6]]}
          />
          <Route path='/MyPage' component={MyPage} />
          <Route path='/Help' component={Help} />
          <Route path='/SignOut' component={SignOut} />
          <Redirect to='/' />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
