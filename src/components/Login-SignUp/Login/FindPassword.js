import React, { useCallback, useState } from "react";
import "./FindPassword.scss";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

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
  const sendEmail = useCallback(() => {
    AuthenticationService.resetPasswordConfirmationService(username);
  }, [username]);
  return (
    <div className='PasswordFrag'>
      <div>
        <div className='contentBox'>
          <div className='labelWrapper'>
            <label htmlFor='email'>이메일</label>
          </div>
          <input
            className='email'
            name='username'
            type='email'
            placeholder='email'
            onChange={handleInput}
            required
            autoFocus
          />
        </div>
        <div>
          <button onClick={sendEmail}>Send New Password</button>
        </div>
      </div>
      <footer className='PasswordFooter'>
        <Link className='linkToMain' to='/'>
          이미 회원이신가요? <span>로그인</span>
        </Link>
      </footer>
    </div>
  );
};

export default FindPassword;
