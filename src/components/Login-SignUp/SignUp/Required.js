import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthCodeTimer from "./AuthCodeTimer";
import AuthBtnBox from "./AuthBtnBox";
import * as auth from "../../../apiService/AuthenticationService";
import axios from "axios";

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

  const isValidateInput = useMemo(
    () => ({
      id: requiredData.username,
      pass: requiredData.password,
      name: requiredData.realName,
      birth: requiredData.bday,
      nick: requiredData.nickname,
    }),
    [requiredData]
  );

  const changeValue = (e) => {
    setrequiredData({
      ...requiredData,
      [e.target.name]: e.target.value,
    });
  };

  /* 값 넘겨주기 끝 */

  /* 인증 코드 발송 */
  const [timerSet, setTimerSet] = useState(false);
  const [startTimer, setStartTimer] = useState(false);

  const CodeTimer = () => {
    if (timerSet) {
      return <AuthCodeTimer start={startTimer} setStart={setStartTimer} />;
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
  const [btnTextHandler, setBtnTextHandler] = useState("인증번호 발송");

  const getAuthCode = (e) => {
    setAuthCode(e.target.value);
  };

  const checkCodes = () => {
    if (securityCode === authCode) {
      setDisabledHandler(true);
      setBtnTextHandler("인증완료");
      changeTimeSet();
      return true;
    } else {
      return false;
    }
  };
  /* 인증코드 통신 및 끝 */

  /* new 유효성 검사 */
  const [EmailValidateResData, setEmailValidateResData] = useState();
  const [nicknameValidateResData, setNicknameValidateResData] = useState();
  const [passwordValidateDesc, setPasswordValidateDesc] = useState();
  const [checkPasswordValidateDesc, setCheckPasswordValidateDesc] = useState();
  const [nameValidateDesc, setNameValidateDesc] = useState();
  const [birthValidateDesc, setBirthValidateDesc] = useState();
  const [passCheckNum, setpassCheckNum] = useState();

  const [nextBtnDisabledHandler, setNextBtnDisabledHandler] = useState(true);

  const totalCheck = useCallback(() => {
    if (
      EmailValidateResData === "" &&
      nicknameValidateResData === "" &&
      passwordValidateDesc === "" &&
      checkPasswordValidateDesc === "" &&
      nameValidateDesc === "" &&
      birthValidateDesc === "" &&
      isValidateInput.nick !== "" &&
      isValidateInput.birth !== "" &&
      isValidateInput.id !== "" &&
      isValidateInput.name !== "" &&
      isValidateInput.pass !== ""
    ) {
      setNextBtnDisabledHandler(false);
    } else {
      setNextBtnDisabledHandler(true);
    }
  }, [
    EmailValidateResData,
    nicknameValidateResData,
    passwordValidateDesc,
    checkPasswordValidateDesc,
    nameValidateDesc,
    birthValidateDesc,
    isValidateInput,
  ]);

  const backSpaceCheck = useCallback(() => {
    totalCheck();
  }, [totalCheck]);

  const { current: passCheck } = useRef(
    /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/
  ); /* 비밀번호는 소문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다. */
  const { current: nameCheck } = useRef(/^[a-zA-Z가-힣]{2,10}$/);
  const { current: birthCheck } = useRef(/^([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/);

  const getPassCheckNum = (e) => {
    setpassCheckNum(e.target.value);
    requiredNextBtnHandler();
  };

  const checkEmailValidate = useCallback(() => {
    axios.post("http://localhost:8888/api/auth/checkemail", requiredData).then((res) => {
      if (res.data !== "") {
        setEmailValidateResData(res.data);
      } else if (res.data === "") {
        setEmailValidateResData("");
      }
    });
  }, [requiredData]);

  const checkNicknameValidate = useCallback(() => {
    axios.post("http://localhost:8888/api/auth/checknickname", requiredData).then((res) => {
      if (res.data !== "") {
        setNicknameValidateResData(res.data);
      } else if (res.data === "") {
        setNicknameValidateResData("");
      }
    });
  }, [requiredData]);

  const checkPasswordValidate = useCallback(() => {
    passCheck.test(isValidateInput.pass) === false && isValidateInput.pass !== ""
      ? setPasswordValidateDesc("비밀번호는 소문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다.")
      : setPasswordValidateDesc("");
  }, [isValidateInput, passCheck]);

  const checkPasswordCheckValidate = useCallback(() => {
    isValidateInput.pass !== passCheckNum && passCheckNum !== ""
      ? setCheckPasswordValidateDesc("비밀번호를 확인해주세요.")
      : setCheckPasswordValidateDesc("");
  }, [isValidateInput, passCheckNum]);

  const checkNameValidate = useCallback(() => {
    if (nameCheck.test(isValidateInput.name) === false && isValidateInput.name !== "") {
      setNameValidateDesc("이름은 2글자 이상의 영문자, 한글만 입력 가능합니다.");
    } else {
      setNameValidateDesc("");
    }
  }, [nameCheck, isValidateInput]);

  const checkBirthValidate = useCallback(() => {
    birthCheck.test(isValidateInput.birth) === false && isValidateInput.birth !== ""
      ? setBirthValidateDesc("-을 제외한 생년월일 6자리만 입력해주세요.")
      : setBirthValidateDesc("");
  }, [birthCheck, isValidateInput]);

  const requiredNextBtnHandler = useCallback(() => {
    if (
      [
        isValidateInput.id,
        isValidateInput.nick,
        isValidateInput.birth,
        isValidateInput.name,
        isValidateInput.pass,
      ].includes("")
    ) {
      setNextBtnDisabledHandler(true);
    }
  }, [isValidateInput]);

  useEffect(() => {
    totalCheck();
  }, [requiredData, passCheckNum, nextBtnDisabledHandler, totalCheck]);

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
              <div className='warningBox'>{EmailValidateResData}</div>
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
                  ></AuthBtnBox>
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
              <div className='warningBox'>{passwordValidateDesc}</div>
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
              <div className='warningBox'>{checkPasswordValidateDesc}</div>
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
              <div className='warningBox'>{nameValidateDesc}</div>
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
              <div className='warningBox'>{birthValidateDesc}</div>
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
                onKeyDown={backSpaceCheck}
              />
              <div className='warningBox'>{nicknameValidateResData}</div>
            </td>
          </tr>
        </table>
        <div className='signUpNextBtnBox'>
          {nextBtnDisabledHandler === false ? (
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
          ) : (
            <button className='btn btn-warning' disabled={true}>
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Required;
