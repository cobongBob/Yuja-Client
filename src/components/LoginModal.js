import React, { useEffect, useRef, useState } from 'react';
import './scss/LoginModal.scss';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginModal = (props) => {
  // 열기, 닫기, 헤더 내용을 부모로부터 받아옴
  const { open, close, header } = props;
  console.log(open);
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    //<div onClick={close}>
    <div className={open ? 'openModal SignUp' : 'SignUp'}>
      {open ? (
        <section>
          <header className="header">
            <span className="close" onClick={close}>
              &times;
            </span>
            <img className="signinIcon" src="/img/parts_pic/yuzu05.png" />{' '}
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
                {' '}
                <input type="checkbox" name="maintainLogin" id="hint" /> 로그인
                유지하기
              </label>
              <div className="autoLogin">아이디/비밀번호 찾기</div>
            </div>
            <button className="loginBtn"> 로그인 </button>
          </main>
          <footer>
            <div className="loginLine">
              회원이 아니신가요? <Link to="/signup">회원가입</Link>
            </div>
            <div className="noUser">무엇을적을까요</div>
          </footer>
        </section>
      ) : null}
    </div>
    //</div>
  );
};

export default LoginModal;
