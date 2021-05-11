import React, { useCallback, useState } from "react";
import "./FindPassword.scss";
import { Link } from "react-router-dom";

const FindPassword = () => {
  const [username, setUsername] = useState({
    username: "",
  });
  const handleInput = useCallback(
    (e) => {
      setUsername({
        ...username,
        [e.target.name]: e.target.value,
      });
    },
    [username]
  );
  const sendEmail = useCallback(() => {}, []);
  return (
    <div className='PasswordFrag'>
      <header className='PasswordHeader'>
        <Link className='header-title' to='/'>
          유자 비밀번호 찾기
        </Link>
      </header>
      <content>
        <div className='contentBox'>
          <div className='labelWrapper'>
            <label htmlFor='email'>이메일</label>
          </div>
          <input
            className='email'
            name='username'
            type='email'
            placeholder='아이디(이메일)'
            onChange={handleInput}
            required
            autoFocus
          />
        </div>
        <div>
          <button onClick={sendEmail}>Reset Password</button>
        </div>
      </content>
      <footer className='PasswordFooter'>
        <Link className='linkToMain' to='/'>
          이미 회원이신가요? <span>로그인</span>
        </Link>
      </footer>
    </div>
  );
};

export default FindPassword;
