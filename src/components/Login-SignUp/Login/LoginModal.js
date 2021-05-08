import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import "./LoginModal.scss";
import "../../Navi/Navi.scss";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

function LoginModal() {
  /* 모달 설정 */
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "80%",
      bottom: "-12%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      WebkitOverflowScrolling: "touch",
      preventScroll: "true",
    },
    overlay: { zIndex: 9999 },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  /* 모달 설정 끝 */

  /* 로그인 관련 */
  const logout = useCallback(() => {
    AuthenticationService.logout();
  }, []);

  const checkLogin = useCallback(() => {
    AuthenticationService.isUserLoggedIn();
  }, []);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
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
  const logInHandler = useCallback(() => {
    AuthenticationService.executeJwtAuthenticationService(loginData).then((res) => {
      console.log(res);
      AuthenticationService.registerSuccessfulLoginForJwt(loginData.username, res.data);
    });
  }, [loginData]);
  /* 로그인 관련 끝 */

  return (
    <>
      <button className='button-login' onClick={checkLogin}>
        로그인체크
      </button>
      <button className='button-login' onClick={logout}>
        로그아웃
      </button>
      <button className='button-login' id='button-login' onClick={openModal}>
        로그인/회원가입
      </button>
      <Modal
        isOpen={modalIsOpen}
        closeTimeoutMS={200}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <section>
          <header className='header'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <img className='signinIcon' src='/img/parts_pic/yuzu05.png' alt='logo' />{" "}
            <div className='header-title'>유자 로그인</div>
          </header>
          <main>
            <input name='username' className='loginId' type='text' placeholder='아이디' onChange={inputHandler} />
            <input name='password' className='loginPw' type='password' placeholder='비밀번호' onChange={inputHandler} />
            <div className='loginMid'>
              <label className='autoLogin' htmlFor='hint'>
                {" "}
                <input type='checkbox' name='maintainLogin' id='hint' /> 로그인 유지하기
              </label>
              <div className='autoLogin'>아이디/비밀번호 찾기</div>
            </div>
            <button className='loginBtn' onClick={logInHandler}>
              {" "}
              로그인{" "}
            </button>
            <button className='googleLoginBtn'> 구글 로그인 </button>
          </main>
          <footer>
            <div className='loginLine'>
              회원이 아니신가요?{" "}
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
