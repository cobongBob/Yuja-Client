import React, { useState, useCallback, useEffect } from 'react';
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
import { ToastTopRight } from '../../../modules/ToastModule';
import { getLoaded, getLoading } from '../../../redux/loading/loadingReducer';
import { getAllNotifications } from '../../../redux/loading/notiReducer';
toast.configure();
Modal.setAppElement('#root');
function LoginModal() {
  const history = useHistory();

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
    console.log('================================', userData);
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
  }, [dispatch]);
  /* 리덕스 관련 끝 */

  //알림
  const loginNotify = useCallback(() => {
    ToastTopRight(`어서오세요! 👋`);
  }, []);
  const logoutNotify = useCallback(() => {
    ToastTopRight(`로그아웃 되셨습니다.`);
  }, []);

  /* 로그인 관련 */
  const logout = useCallback(() => {
    userLogout().then((res) => {
      dispatch(res);
      logoutNotify();
      setLoginData('');
      history.push('/');
    });
  }, [dispatch, history, logoutNotify]);

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
    console.log('logInHandler의 loginData', loginData);
    userLogin(loginData, setLoginValidateDesc).then((res) => {
      console.log('============res ================', res);
      dispatch(res);
      if (res.userLoginStatus === false) {
        setIsOpen(true);
      } else {
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
            pathname: '/SignUp1',
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
  const showMenu = () => setHideMenu(!hideMenu);

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
            <button className='welcomeBox' onClick={showMenu}>
              {userData.nickname}
            </button>
            {hideMenu === true && (
              <ul>
                <li className='modifyBox'>
                  <Link to='/BeforeModify' className='modifyBtn'>
                    정보수정
                  </Link>
                </li>
                <li className='modifyBox'>
                  <button className='modifyBtn' onClick={logout}>
                    로그아웃
                  </button>
                </li>
                <li></li>
              </ul>
            )}
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
              src='/img/parts_pic/yuzu05.png'
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
                clientId='373267940764-jujlpjtg3qtd21bg6496vaj7k9ooj56e.apps.googleusercontent.com'
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
              <Link to='/SignUp1' onClick={closeModal}>
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
