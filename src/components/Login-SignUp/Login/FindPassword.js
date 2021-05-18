import React, { useCallback, useState } from "react";
import "./FindPassword.scss"
import { Link } from "react-router-dom";
import * as auth from "../../../apiService/AuthenticationService";
import AuthBtnBox from '../SignUp/AuthBtnBox';
import ResetPasswordAuthBox from '../SignUp/ResetPasswordAuthBox';
import { resetPasswordEmailSend } from '../../../apiService/AuthenticationService';

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
  const [restPasswordAuthCode, setRestPasswordAuthCode] = useState();
  const [resetPasswordSecurityCode, setResetPasswordSecurityCode] = useState("오늘점심은부대찌개!!");
  const [btnTextHandler, setBtnTextHandler] = useState("인증번호 발송");
  const [authDisabledHandler, setAuthDisabledHandler] = useState(false);

  const [resetPasswordSendBtnHandler, setResetPasswordSendBtnHandler] = useState(true);

  const [resetPasswordEmailData, setResetPasswordEmailResData] = useState("");
  const [resetEmailDisableHandler, setResetEmailDisableHandler] = useState(false);
  const [securityCodeValidateDesc, setSecurityCodeValidateDesc] = useState();

  const getAuthCode = (e) => {
    setRestPasswordAuthCode(e.target.value);
  };

  const sendResetPasswordSecurityCode = useCallback(() => {
    setResetPasswordSendBtnHandler(false)
    console.log('sendResetPasswordCode 실행')
    auth.resetPasswordEmailSend(username.username).then((res) => {
      console.log(res.data);
      setResetPasswordSecurityCode(res.data);

    }).catch(e => alert(e.response.data.message))
  }, [setResetPasswordSecurityCode,username]);

  const resetPasswordCheckCodes = useCallback(() => {
    console.log('resetPasswordCheckCodes 실행')
    if(username === '' || resetPasswordEmailData !== '') {
      console.log('이메일이 비어있거나 틀림')
      setResetPasswordEmailResData('이메일을 확인 해주세요.')
    } else if(restPasswordAuthCode === resetPasswordSecurityCode) {
      console.log('인증성공')
      setAuthDisabledHandler(true)
      setBtnTextHandler('인증완료')
      setSecurityCodeValidateDesc('')
      setResetEmailDisableHandler(true)
    } else {
      console.log('인증실패')
      setSecurityCodeValidateDesc('인증번호를 확인해주세요.')
    }
  }, [username, resetPasswordEmailData])


  return (
    <div className='PasswordFrag'>

      <div className='passwordTitleBox'>
        <Link className='passwordTitle' to='/'>유자 비밀번호 찾기</Link>
      </div>

        <div className='passwordContentBox'>
          <div className='overlay'>
          <div className='emailBox'>
            <div className='newPasswordDescBox'>
              찾으시고자 하는 이메일 계정을 입력해주세요.<br/>
              인증 후 새로운 비밀번호로 변경하실 수 있습니다.
            </div>
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
            <label
              htmlFor='authenticationCodeCheck'
              className='authenticationCodeCheckLabel'
            >
              이메일 인증번호 입력
            </label>
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
                disabled={authDisabledHandler}
                autoComplete='off'
              />
            </div>
            <div className='authenticationCodeSendBox'>
              <ResetPasswordAuthBox
                className='authenticationCodeSend'
                btnTextHandler={btnTextHandler}
                authDisabledHandler={authDisabledHandler}
                sendResetPasswordSecurityCode={sendResetPasswordSecurityCode}
                resetPasswordCheckCodes={resetPasswordCheckCodes}
                resetPasswordSendBtnHandler={resetPasswordSendBtnHandler}
                autoComplete='off'
              >
              </ResetPasswordAuthBox>
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
