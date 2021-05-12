import React, { useCallback, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import AuthCodeTimer from "./AuthCodeTimer";
import AuthBtnBox from "./AuthBtnBox";
import * as auth from "../Login/AuthenticationService";
import axios from 'axios';

const Required = ({ location }) => {
  /* 값 넘겨주기 */
  const [requiredData, setrequiredData] = useState({
    isMarketingChecked: location.state.next,
    username: "",
    password: "",
    realName: "",
    bday: "",
    nickname: "",
  });
  const changeValue = (e) => {
    setrequiredData({
      ...requiredData,
      [e.target.name]: e.target.value,
    });
  };
  /* 값 넘겨주기 끝 */

  /* 유효성 검사 */
  let [passCheckNum, setpassCheckNum] = useState();

  const getPassCheckNum = (e) => {
    setpassCheckNum(e.target.value);
  };
  const checkRequiredUserData = (e) => {
    let id = requiredData.username;
    let pass = requiredData.password;
    let name = requiredData.realName;
    let birth = requiredData.bday;
    let nick = requiredData.nickname;

    const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passCheck = /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/; /* 비밀번호는 소문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다. */
    const nameCheck = /^[a-zA-Z가-힣]{2,10}$/;
    const birthCheck = /^([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/;
    const nickCheck = /^[a-zA-Z0-9가-힣ㄱ-ㅎ]{2,20}$/; /* 특수문자 제외 영문, 숫자, 한글 2~20자 */

    if ([id, pass, name, birth, nick].includes("") || [id, pass, name, birth, nick].includes("{")) {
      alert("빈칸을 모두 입력해주세요.");
      e.preventDefault();
    } else if (false === emailCheck.test(id)) {
      alert("올바른 이메일 형식이 아닙니다.");
      e.preventDefault();
    } else if (false === passCheck.test(pass)) {
      alert("4~10자, 숫자랑 영어만 / 테스트용 비밀번호");
      e.preventDefault();
    } else if (pass !== passCheckNum) {
      alert("비밀번호를 확인해주세요!");
      e.preventDefault();
    } else if (false === nameCheck.test(name)) {
      alert("이름은 영문자, 한글만 입력 가능합니다!");
      e.preventDefault();
    } else if (false === birthCheck.test(birth)) {
      alert("생년월일 형식을 확인해주세요. ");
      e.preventDefault();
    } else if (false === nickCheck.test(nick)) {
      alert("닉네임은 특수문자를 제외한 2~20자만 입력 가능합니다.");
      e.preventDefault();
    }
  };
  /* 유효성 검사 끝*/

  /* 인증 코드 발송 */
  const [timerSet, setTimerSet] = useState(false);
  const [startTimer, setStartTimer] = useState(false);

  console.log("timerSet의 값", timerSet);
  console.log("startTimer의 값", startTimer);

  const CodeTimer = () => {
    if (timerSet) {
      return <AuthCodeTimer start={startTimer} setStart={setStartTimer} />;
    } else {
      return;
    }
  };

  const changeStartTimer = () => {
    auth.verifyEmailSend(requiredData.username).then((res) => {
      setSecurityCode(res.data);
    });
    return setStartTimer(!startTimer);
  };

  const changeTimeSet = () => {
    return setTimerSet(!timerSet);
  };
  /* 인증 코드 발송 끝 */

  /* 인증코드 통신 및 확인 */
  const [authCode, setAuthCode] = useState();
  const [securityCode, setSecurityCode] = useState("a12345");
  const [disabledHandler, setDisabledHandler] = useState(false);
  const [btnTextHandler, setBtnTextHandler] = useState('인증번호 발송');

  console.log("authCode의 값", authCode);

  const getAuthCode = (e) => {
    setAuthCode(e.target.value);
  };

  const checkCodes = (e) => {
    if (securityCode === authCode) {
      console.log("인증성공");
      setDisabledHandler(true);
      setBtnTextHandler('인증완료')
      changeTimeSet();
      return true;
    } else {
      console.log("인증실패");
      return false;
    }
  };
  /* 인증코드 통신 및 끝 */

  /* new 유효성 검사 */
  const [currentFocusedClassName, setCurrentFocusedClassName] = useState();
  const [EmailValidateResData, setEmailValidateResData] = useState();
  const [nicknameValidateResData, setNicknameValidateResData] = useState();
  const [passwordValidateDesc, setPasswordValidateDesc] = useState();


  let id = requiredData.username;
  let pass = requiredData.password;
  let name = requiredData.realName;
  let birth = requiredData.bday;
  let nick = requiredData.nickname;

  const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const passCheck = /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/; /* 비밀번호는 소문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다. */
  const nameCheck = /^[a-zA-Z가-힣]{2,10}$/;
  const birthCheck = /^([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/;
  const nickCheck = /^[a-zA-Z0-9가-힣ㄱ-ㅎ]{2,20}$/; /* 특수문자 제외 영문, 숫자, 한글 2~20자 */

  const checkEmailValidate = useCallback(()=>{
    axios.post("http://localhost:8888/api/auth/checkemail",requiredData).then(res=>{
      console.log(res.data);
      res.data !== '' ?
        setEmailValidateResData(res.data)
        :
        setEmailValidateResData('')
    })
  })

  const checkNicknameValidate = useCallback(()=>{
    axios.post("http://localhost:8888/api/auth/checknickname",requiredData).then(res=>{
      console.log(res.data);
      res.data !== '' ?
        setNicknameValidateResData(res.data)
        :
        setNicknameValidateResData('')
    })
  })

  const checkPasswordValidate = useCallback(()=> {
    passCheck.test(pass) === false ?
      setPasswordValidateDesc('비밀번호는 소문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다.')

      :
      setPasswordValidateDesc('')
  })

  /* new 유효성 검사 끝 */

  return (
    <div className='contentBox2'>
      <div className='overlay'>
        <div className='required'>* 필수입력 정보입니다.</div>
        <table className='signUpTable'>
          <tr>
            <td>
              <div className='labelWrapper'>
                <label htmlFor='signUpId'>이메일</label>
              </div>
              <input
                className='signUpId'
                name='username'
                type='email'
                placeholder='아이디(이메일)'
                onChange={changeValue}
                onKeyUp={checkEmailValidate}
                onFocus={()=>setCurrentFocusedClassName('email')}
                onBlur={()=>setCurrentFocusedClassName('')}
                autoFocus
              />
              { currentFocusedClassName === 'email' ?
                <div className='warningBox'>
                  {EmailValidateResData}
                </div>
                :
                ''
              }
            </td>
          </tr>
          <tr>
            <td>
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
                  />
                </div>
                <div className='codeTimerBox'>{CodeTimer()}</div>
                <div className='authenticationCodeSendBox'>
                  <AuthBtnBox
                    className='authenticationCodeSend'
                    timerSet={timerSet}
                    setTimerSet={setTimerSet}
                    startTimer={startTimer}
                    setStartTimer={setStartTimer}
                    changeTimeSet={changeTimeSet}
                    changeStartTimer={changeStartTimer}
                    checkCodes={checkCodes}
                    btnTextHandler={btnTextHandler}
                    disabledHandler={disabledHandler}
                  >
                  </AuthBtnBox>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className='labelWrapper'>
                <label htmlFor='signUpPw'>비밀번호</label>
              </div>
              <input
                className='signUpPw'
                name='password'
                type='password'
                placeholder='비밀번호'
                onChange={changeValue}
                onKeyUp={checkPasswordValidate}
                required
                onFocus={()=>setCurrentFocusedClassName('password')}
                onBlur={()=>setCurrentFocusedClassName('')}
              />
              { currentFocusedClassName === 'password' ?
                <div className='warningBox'>
                  {passwordValidateDesc}
                </div>
                :
                ''
              }
            </td>
          </tr>
          <tr>
            <td>
              <div className='labelWrapper'>
                <label htmlFor='signUpPwCheck'>비밀번호 확인</label>
              </div>
              <input
                className='signUpPwCheck'
                name='passwordCheckNum'
                type='password'
                placeholder='비밀번호 확인'
                onChange={getPassCheckNum}
                onFocus={()=>setCurrentFocusedClassName('passwordCheck')}
                onBlur={()=>setCurrentFocusedClassName('')}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className='labelWrapper'>
                <label htmlFor='signUpName'>이름(실명)</label>
              </div>
              <input
                className='signUpName'
                name='realName'
                type='text'
                placeholder='이름(실명)'
                onChange={changeValue}
                onFocus={()=>setCurrentFocusedClassName('passwordCheck')}
                onBlur={()=>setCurrentFocusedClassName('')}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className='labelWrapper'>
                <label htmlFor='signUpBirthdate'>생년월일</label>
              </div>
              <input
                className='signUpBirthdate'
                name='bday'
                type='text'
                maxLength='6'
                placeholder='생년월일(-을 제외한 6자리)'
                onChange={changeValue}
                onFocus={()=>setCurrentFocusedClassName('passwordCheck')}
                onBlur={()=>setCurrentFocusedClassName('')}
              />
            </td>
          </tr>
          <tr>
            <td>
              <div className='labelWrapper'>
                <label htmlFor='signUpNickname'>닉네임</label>
              </div>
              <input
                className='signUpNickname'
                name='nickname'
                type='text'
                maxLength='20'
                placeholder='닉네임'
                onChange={changeValue}
                onKeyUp={checkNicknameValidate}
                onFocus={()=>setCurrentFocusedClassName('nickname')}
                onBlur={()=>setCurrentFocusedClassName('')}
              />
              { currentFocusedClassName === 'nickname' ?
                <div className='warningBox'>
                  {nicknameValidateResData}
                </div>
                :
                ''
              }
            </td>
          </tr>
        </table>
        <div className='signUpNextBtnBox'>
          <Link
            to={{
              pathname: "/SignUp1/NonRequired",
              state: {
                requiredData: requiredData,
              },
            }}
            className='btn btn-warning'
            //onClick={checkRequiredUserData}
          >
            다음
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Required;
