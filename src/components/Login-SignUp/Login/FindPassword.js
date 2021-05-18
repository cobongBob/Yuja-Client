import React, { useCallback, useState } from "react";
import "./FindPassword.scss"
import { Link } from "react-router-dom";
import * as auth from "../../../apiService/AuthenticationService";
import AuthBtnBox from '../SignUp/AuthBtnBox';

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

  /* 인증번호 발송 관련 */
  const [authCode, setAuthCode] = useState();
  const [securityCode, setSecurityCode] = useState("오늘점심은부대찌개!!");
  const [btnTextHandler, setBtnTextHandler] = useState("인증번호 발송");
  const [disabledHandler, setDisabledHandler] = useState(false);

  const [resetPasswordEmailData, setResetPasswordEmailResData] = useState("");
  const [resetEmailDisableHandler, setResetEmailDisableHandler] = useState(false);
  const [securityCodeValidateDesc, setSecurityCodeValidateDesc] = useState();

  const getAuthCode = (e) => {
    setAuthCode(e.target.value);
  };

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
                autofocus='on'
              >
                이메일 입력
              </label>
            </div>
            <input
              className='passwordEmail'
              name='username'
              type='email'
              placeholder='가입하신 이메일을 입력해주세요'
              disabled={resetEmailDisableHandler}
              autoComplete='off'
              onChange={handleInput}
              autoFocus
            />
            <div className='warningBox'>
              {resetPasswordEmailData}
            </div>
          </div>
        <div className='newPasswordSendBtnBox'>

          <div className='labelWrapper'>
            <label htmlFor='authenticationCodeCheck'>이메일 인증번호 입력</label>
          </div>
          <div className='authCodeCheckBox'>
            <div className='authenticationCodeBox'>
              <input
                className='authenticationCodeCheck'
                name='authenticationCode'
                type='text'
                maxLength='8'
                placeholder='인증번호 입력'
                onChange={getAuthCode}
                disabled={disabledHandler}
                autoComplete='off'
              />
            </div>
            <div className='authenticationCodeSendBox'>
              <AuthBtnBox
                className='authenticationCodeSend'

                btnTextHandler={btnTextHandler}
                disabledHandler={disabledHandler}
                autoComplete='off'
              ></AuthBtnBox>
            </div>
            <div className='warningBox'>{securityCodeValidateDesc}</div>
          </div>

      </div>
        </div>
      <footer className='PasswordFooter'>
        <Link className='linkToMain' to='/'>
          이미 회원이신가요? <span>로그인</span>
        </Link>
      </footer>
    </div>
    </div>
  );
};

export default FindPassword;
