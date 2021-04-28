import React from 'react';
import Modal from 'react-modal';
import "./scss/LoginModal2.scss";
import "./scss/SignButton.scss"
import { Link } from 'react-router-dom';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '80%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function LoginModal2(){

  const [modalIsOpen,setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {

  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <>
      <button className="button-login" onClick={openModal}>로그인</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <section>
          <header className="header">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img className="signinIcon" src="/img/parts_pic/yuzu05.png" />{" "}
            <div className="header-title">유자 로그인</div>
          </header>
          <main>
            <input
              name="email"
              className="loginId"
              type="text"
              placeholder="아이디"
            />
            <input
              name="password"
              className="loginPw"
              type="password"
              placeholder="비밀번호"
            />
            <div className="loginMid">
              <label className="autoLogin" htmlFor="hint">
                {" "}
                <input type="checkbox" name="maintainLogin" id="hint" /> 로그인
                유지하기
              </label>
              <div className="autoLogin">아이디/비밀번호 찾기</div>
            </div>
            <button className="loginBtn"> 로그인 </button>
            <button className="googleLoginBtn"> 구글 로그인 </button>
          </main>
          <footer>
            <div className="loginLine">
              회원이 아니신가요?{" "}
              <Link to="/SignUp1" onClick={closeModal}>
                이메일로 회원가입
              </Link>
            </div>
            <div className="noUser">무엇을적을까요???</div>
          </footer>
        </section>

      </Modal>
    </>
  );
}

export default LoginModal2;