import React, { useCallback, useState } from "react";
import "./FindPassword.scss"
import { Link } from "react-router-dom";
import * as auth from "./AuthenticationService";

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
  const sendEmail = useCallback(async () => {
    await auth.resetPasswordConfirmationService(username);
  }, [username]);

  return (
    <div className='PasswordFrag'>
      <div className='passwordTitleBox'>
        <Link className='passwordTitle' to='/'>유자 비밀번호 찾기</Link>
      </div>
        <div className='passwordContentBox'>
          <div className='overlay'>
          <div className='emailBox'>
            <div className='labelWrapper'>
              <label
                className='passwordEmailLabel'
                htmlFor='email'
              >
                이메일 입력
              </label>
            </div>
            <input
              className='passwordEmail'
              name='username'
              type='email'
              placeholder='가입하신 이메일을 입력해주세요'
              onChange={handleInput}
              required
              autoFocus
            />
          </div>
        <div className='newPasswordSendBtnBox'>
          <button
            className='btn btn-warning'
            onClick={sendEmail}
          >
            임시 비밀번호 전송
          </button>
        </div>
            <div className='newPasswordDescBox'>
              입력하신 이메일로 임시 비밀번호를 보내드립니다.<br/>
              <span>로그인 후 꼭 새로운 비밀번호</span>로 변경해주세요!
            </div>
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
