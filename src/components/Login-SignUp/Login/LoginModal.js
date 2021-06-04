import React, { useState, useCallback, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import './LoginModal.scss';
import '../../Navi/Navi.scss';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../../../apiService/AuthenticationService';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import {
  userLogin,
  userLogout,
  userCheck,
} from '../../../redux/redux-login/loginReducer';
import googleLoginIcon from './googleLoginIcon2.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastAlert, ToastTopRight } from '../../../modules/ToastModule';
import { getLoaded, getLoading } from '../../../redux/loading/loadingReducer';
import { getAllNotifications } from '../../../redux/loading/notiReducer';
import NotificationDropdown from '../../Navi/NotificationDropdown';
import { IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io';
import '../../Navi/Notification.scss';

toast.configure();
Modal.setAppElement('#root');
function LoginModal({ allNotifications, setModalIsOpen }) {
  const history = useHistory();

  const beforeModify = useCallback(() => {
    history.push('/BeforeModify');
  }, [history]);

  /* 모달 설정 */
  const LoginModalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '80%',
      bottom: '-12%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'hidden',
      WebkitOverflowScrolling: 'touch',
      preventScroll: 'true',
    },
    overlay: { zIndex: 9999 },
  };
  const [modalIsOpen, setIsOpen] = useState();

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setLoginValidateDesc('');
    setIsOpen(false);
  }

  // 구글 아이콘 스타일
  const customStyle = {
    background: 'royalblue',
    height: '40px',
    width: '100%',
    fontSize: '14px',
    color: 'white',
    lineHeight: '1px',
    marginTop: '10px',
    marginBottom: '12PX',
    borderRadius: '3px',
    borderStyle: 'none',
  };

  /* 모달 설정 끝 */

  /* form, submit 새로고침 방지용 */
  const onSubmit = (e) => {
    e.preventDefault();
  };
  /* form, submit 새로고침 방지용 끝 */

  /* 리덕스 관련 */
  const { userLoginStatus, userData } = useSelector(
    (state) => state.loginReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    userCheck().then((res) => {
      dispatch(res);
      if (res.userLoginStatus === false) {
        auth.authLogout();
      }
    });
    document.addEventListener('click', dropMenuOutside, true);
    return () => {
      document.removeEventListener('click', dropMenuOutside, true);
    };
  }, [dispatch]);
  /* 리덕스 관련 끝 */

  const myPage = useCallback(() => {
    history.push('/MyPage');
  }, [history]);

  //알림
  const loginNotify = useCallback(() => {
    ToastTopRight(`어서오세요! 👋`);
  }, []);
  const logoutNotify = useCallback(() => {
    ToastTopRight(`로그아웃 되셨습니다.`);
  }, []);
  const loginErrorNotify = useCallback(() => {
    ToastAlert('잘못된 로그인 입니다.');
  }, []);

  /* 로그인 관련 */
  const logout = useCallback(() => {
    userLogout().then((res) => {
      setModalIsOpen(false);
      dispatch(res);
      logoutNotify();
      setLoginData('');
      history.push('/');
    });
  }, [dispatch, history, logoutNotify, setModalIsOpen]);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const inputHandler = useCallback(
    (e) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      });
    },
    [loginData]
  );
  const logInHandler = useCallback(async () => {
    userLogin(loginData).then((res) => {
      dispatch(res);
      if (res.userLoginStatus === false) {
        setIsOpen(true);
        setLoginValidateDesc('이메일이나 비밀번호가 일치하지 않습니다.');
      } else {
        setLoginValidateDesc('');
        loginNotify();
        dispatch(getLoading(res.payload.id));
        if (res.payload && res.payload.id > 0) {
          dispatch(getAllNotifications(res.payload.id));
        }
        setIsOpen(false);
        dispatch(getLoaded());
      }
    });
  }, [loginData, dispatch, loginNotify]);

  const resGoogle = useCallback(
    async (response) => {
      await auth.googleLoginService(response).then((res) => {
        if (res.providerId === null) {
          userLogin(res).then((respon) => {
            dispatch(respon);
            loginNotify();
            respon.userLoginStatus === false
              ? setIsOpen(true)
              : setIsOpen(false);
          });
          closeModal();
        } else {
          closeModal();
          history.push({
            pathname: '/SignUp',
            resData: {
              res,
            },
          });
        }
      });
    },
    [dispatch, history, loginNotify]
  );
  /* 로그인 관련 끝 */

  /* 로그인 워닝 박스 */
  const [loginValidateDesc, setLoginValidateDesc] = useState('');

  /* 로그인 워닝 박스 끝 */

  const [hideMenu, setHideMenu] = useState(false);
  const dropMenu = useRef('');
  const menu = useRef('');

  const showMenu = () => {
    setHideMenu(!hideMenu);
  };

  const dropMenuOutside = (e) => {
    if (
      dropMenu.current &&
      !dropMenu.current.contains(e.target) &&
      !menu.current.contains(e.target)
    ) {
      setHideMenu(false);
    }
  };

  return (
    <>
      <div className='navChangeBox'>
        {userLoginStatus === false ? (
          <button
            className='button-login'
            id='button-login'
            onClick={openModal}
          >
            로그인/회원가입
          </button>
        ) : (
          <div>
            <button className='welcomeBox' onClick={showMenu} ref={menu}>
              {userData.nickname}
              {allNotifications.length > 0 &&
              userData &&
              userData.id !== 0 &&
              allNotifications[0].resipeint.id === userData.id ? (
                <span id='dropdown-basic'>
                  <IoMdNotifications className='noti_icon' size='30' />
                </span>
              ) : (
                <span>
                  <IoMdNotificationsOutline className='noti_icon' size='30' />
                </span>
              )}
            </button>
            <div>
              {hideMenu === true && (
                <ul className='notice_ul' ref={dropMenu}>
                  <li>
                    <button onClick={myPage} className='modifyBtn'>
                      찜목록
                    </button>
                  </li>
                  <li>
                    <button onClick={beforeModify} className='modifyBtn'>
                      정보수정
                    </button>
                  </li>
                  <li>
                    <button
                      className='modifyBtn'
                      onClick={() => {
                        setHideMenu(false);
                        logout();
                      }}
                    >
                      로그아웃
                    </button>
                  </li>
                  <NotificationDropdown
                    allNotifications={allNotifications}
                    setHideMenu={setHideMenu}
                    setModalIsOpen={setModalIsOpen}
                  />
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        closeTimeoutMS={200}
        onRequestClose={closeModal}
        style={LoginModalCustomStyles}
        contentLabel='Example Modal'
      >
        <section>
          <header className='header'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <img
              className='signinIcon'
              src='/img/parts_pic/YujaLogo.png'
              alt='logo'
            />{' '}
            <div className='header-title'>유자 로그인</div>
          </header>
          <main>
            <form onSubmit={onSubmit}>
              <input
                name='username'
                className='loginId'
                type='text'
                placeholder='아이디'
                onChange={inputHandler}
                maxLength='30'
                autoFocus
              />
              <input
                name='password'
                className='loginPw'
                type='password'
                placeholder='비밀번호'
                onChange={inputHandler}
                maxLength='15'
              />
              <div className='loginMid'>
                <div className='warningBox'>{loginValidateDesc}</div>
                <div className='findPasswordBox'>
                  <Link
                    className='findPassword'
                    to='/FindPassword'
                    onClick={closeModal}
                  >
                    비밀번호 찾기
                  </Link>
                </div>
              </div>
              <input
                type='submit'
                className='loginBtn'
                value='로그인'
                onClick={logInHandler}
              ></input>
              <GoogleLogin
                className='googleLoginBtn'
                clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY}
                buttonText='구글 로그인'
                onSuccess={resGoogle}
                onFailure={resGoogle}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                  <button onClick={renderProps.onClick} style={customStyle}>
                    <img
                      src={googleLoginIcon}
                      alt='안보임'
                      className='googleIcon'
                    />
                    구글 로그인
                  </button>
                )}
              />
            </form>
          </main>
          <footer>
            <div className='loginLine'>
              회원이 아니신가요?{' '}
              <Link to='/SignUp' onClick={closeModal}>
                이메일로 회원가입
              </Link>
            </div>
            <div className='noUser'></div>
          </footer>
        </section>
      </Modal>
    </>
  );
}

export default LoginModal;
