import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import AuthCodeTimer from "./AuthCodeTimer";
import AuthBtnBox from "./AuthBtnBox";
import * as auth from "../Login/AuthenticationService";
import axios from 'axios';

const Required = ({ location }) => {

  /* 인풋에 딜레이 */

  const waitInterval = 3000;
  const [timer, setTimer] = useState(null);

  useEffect(()=> {
    setTimer(null);
  })

  /* 인풋에 딜레이 끝 */

  /* 값 넘겨주기 */
  const [requiredData, setrequiredData] = useState({
    isMarketingChecked: location.state.next,
    username: "",
    password: "",
    realName: "",
    bday: "",
    nickname: "",
  });
  const changeValue = async (e) => {
    console.log('======changeValue실행')
    clearTimeout(timer)
    setTimer(setTimeout(waitInterval))
    await setrequiredData({
      ...requiredData,
      [e.target.name]: e.target.value,
    });
    console.log('======requiredNextBtnHandler실행')
    await requiredNextBtnHandler()
    console.log(requiredData)
  };
  /* 값 넘겨주기 끝 */

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
  const [checkPasswordValidateDesc, setCheckPasswordValidateDesc] = useState();
  const [nameValidateDesc, setNameValidateDesc] = useState();
  const [birthValidateDesc, setBirthValidateDesc] = useState();
  const [passCheckNum, setpassCheckNum] = useState();
  const [nextBtnDisabledHandler, setNextBtnDisabledHandler] = useState();

  const isValidateInput = useMemo(()=> ({
    id : requiredData.username,
    pass : requiredData.password,
    name : requiredData.realName,
    birth : requiredData.bday,
    nick : requiredData.nickname
  }),[requiredData])


  const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const passCheck = /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/; /* 비밀번호는 소문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다. */
  const nameCheck = /^[a-zA-Z가-힣]{2,10}$/;
  const birthCheck = /^([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/;
  const nickCheck = /^[a-zA-Z0-9가-힣ㄱ-ㅎ]{2,20}$/; /* 특수문자 제외 영문, 숫자, 한글 2~20자 */

  const getPassCheckNum = (e) => {
    setpassCheckNum(e.target.value);
    requiredNextBtnHandler()
  };

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
    passCheck.test(isValidateInput.pass) === false && isValidateInput.pass !== ''?
      setPasswordValidateDesc('비밀번호는 소문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다.')
      :
      setPasswordValidateDesc('')
  })

  const checkPasswordCheckValidate = useCallback(()=> {
    isValidateInput.pass !== passCheckNum && passCheckNum !== '' ?
      setCheckPasswordValidateDesc('비밀번호를 확인해주세요.')
      :
      setCheckPasswordValidateDesc('')
  })

  const checkNameValidate = useCallback(()=> {
    nameCheck.test(isValidateInput.name) === false && isValidateInput.name !== '' ?
      setNameValidateDesc('이름은 2글자 이상의 영문자, 한글만 입력 가능합니다.')
      :
      setNameValidateDesc('')
  })

  const checkBirthValidate = useCallback(()=> {
    birthCheck.test(isValidateInput.birth) === false && isValidateInput.birth !== '' ?
      setBirthValidateDesc('-을 제외한 생년월일 6자리만 입력해주세요.')
      :
      setBirthValidateDesc('')
  })

  const requiredNextBtnHandler = useCallback(()=> {
    console.log('!!!!!nextBtnHandler 실행')
    if ([isValidateInput.id,isValidateInput.nick,isValidateInput.birth,isValidateInput.name,isValidateInput.pass].includes("")) {
      console.log('1')
      setNextBtnDisabledHandler(true)
    } else if (EmailValidateResData !== '') {
      console.log('2')
      setNextBtnDisabledHandler(true)
      } else if (false === passCheck.test(isValidateInput.pass)) {
      console.log('3')
      setNextBtnDisabledHandler(true)
    } else if (isValidateInput.pass !== passCheckNum) {
      console.log('4')
      setNextBtnDisabledHandler(true)
    } else if (false === nameCheck.test(isValidateInput.name)) {
      console.log('5')
      setNextBtnDisabledHandler(true)
    } else if (false === birthCheck.test(isValidateInput.birth)) {
      console.log('6')
      setNextBtnDisabledHandler(true)
    } else if (false === nickCheck.test(isValidateInput.nick)) {
      console.log('7')
      setNextBtnDisabledHandler(true)
    } else {
      console.log('8')
      setNextBtnDisabledHandler(false)
    }
    console.log('btnhandler값 ', nextBtnDisabledHandler)
  },[isValidateInput, EmailValidateResData, passCheckNum, nextBtnDisabledHandler]);

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
                autoFocus
              />
                <div className='warningBox'>
                  {EmailValidateResData}
                </div>
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
              />
                <div className='warningBox'>
                  {passwordValidateDesc}
                </div>
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
                onKeyUp={checkPasswordCheckValidate}
              />
                <div className='warningBox'>
                  {checkPasswordValidateDesc}
                </div>
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
                onKeyUp={checkNameValidate}
              />
                <div className='warningBox'>
                  {nameValidateDesc}
                </div>
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
                onKeyUp={checkBirthValidate}
              />
                <div className='warningBox'>
                  {birthValidateDesc}
                </div>
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
              />
                <div className='warningBox'>
                  {nicknameValidateResData}
                </div>
            </td>
          </tr>
        </table>
        <div className='signUpNextBtnBox'>
          {
            nextBtnDisabledHandler === false ?
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
              :
              <button
                className='btn btn-warning'
                disabled={true}
              >
                다음
              </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Required;
