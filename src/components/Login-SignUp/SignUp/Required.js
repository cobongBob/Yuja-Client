import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCodeTimer from './AuthCodeTimer';
import AuthBtnBox from './AuthBtnBox';
import * as auth from '../../../apiService/AuthenticationService';
import axios from 'axios';
import { ToastPreventAccess } from '../../../modules/ToastModule';

const Required = ({ location, history }) => {
  if (location.state === undefined || history.action === 'POP') {
    ToastPreventAccess('❌ 잘못된 접근 입니다.');
    history.replace('/');
  }

  /* 값 넘겨주기 */
  const [requiredData, setrequiredData] = useState({
    isMarketingChecked: location.state ? location.state.next : null,
    username:
      location.state && location.state.googleSignupData
        ? location.state.googleSignupData.username
        : '',
    password:
      location.state && location.state.googleSignupData
        ? location.state.googleSignupData.password
        : '',
    realName:
      location.state && location.state.googleSignupData
        ? location.state.googleSignupData.realName
        : ' ',
    provider:
      location.state && location.state.googleSignupData
        ? location.state.googleSignupData.provider
        : '',
    providedId:
      location.state && location.state.googleSignupData
        ? location.state.googleSignupData.providerId
        : '',
    bday: '',
    nickname: '',
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

  /* 인증코드 통신 및 확인 */
  const [authCode, setAuthCode] = useState();
  const [securityCode, setSecurityCode] = useState('오늘점심은부대찌개!!');
  const [disabledHandler, setDisabledHandler] = useState(false);
  const [emailDisableHandler, setEmailDisableHandler] = useState(false);
  const [btnTextHandler, setBtnTextHandler] = useState('인증번호 발송');

  const getAuthCode = (e) => {
    setAuthCode(e.target.value);
  };

  const checkCodes = () => {
    if (isValidateInput.id === '' || EmailValidateResData !== '') {
      setSecurityCodeValidateDesc('이메일을 확인 해주세요.');
    } else if (securityCode === authCode) {
      clearTimeout(setSecurityCode);
      changeTimeSet();
      setDisabledHandler(true);
      setBtnTextHandler('인증완료');
      totalCheck();
      setSecurityCodeValidateDesc('');
      setEmailDisableHandler(true);
      return true;
    } else {
      totalCheck();
      setSecurityCodeValidateDesc('인증번호를 확인 해주세요.');
      return false;
    }
  };
  /* 인증코드 통신 및 끝 */

  /* 인증 코드 발송 */
  const [timerSet, setTimerSet] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const securityCodeDelay = 1000 * 60 * 3;

  const CodeTimer = () => {
    if (timerSet) {
      return <AuthCodeTimer start={startTimer} setStart={setStartTimer} />;
    }
  };
  const changeStartTimer = () => {
    auth.verifyEmailSend(requiredData.username).then((res) => {
      setSecurityCode(res.data);
      setTimeout(() => {
        setSecurityCode('내일점심은부대찌개!');
      }, securityCodeDelay);
    });
    return setStartTimer(!startTimer);
  };
  const changeTimeSet = () => {
    if (isValidateInput.id === '' || EmailValidateResData !== '') {
      setSecurityCodeValidateDesc('이메일을 확인 해주세요.');
      return '';
    }
    setTimerSet(!timerSet);
    changeStartTimer();
    setSecurityCodeValidateDesc('');
  };
  /* 인증 코드 발송 끝 */

  /* new 유효성 검사 */
  const [EmailValidateResData, setEmailValidateResData] = useState('');
  const [nicknameValidateResData, setNicknameValidateResData] = useState('');
  const [passwordValidateDesc, setPasswordValidateDesc] = useState('');
  const [checkPasswordValidateDesc, setCheckPasswordValidateDesc] = useState('');
  const [nameValidateDesc, setNameValidateDesc] = useState('');
  const [birthValidateDesc, setBirthValidateDesc] = useState('');
  const [securityCodeValidateDesc, setSecurityCodeValidateDesc] = useState();
  const [passCheckNum, setpassCheckNum] = useState();

  const requiredNextBtnHandler = useCallback(() => {
    if (
      [
        isValidateInput.id,
        isValidateInput.nick,
        isValidateInput.birth,
        isValidateInput.name,
        isValidateInput.pass,
      ].includes('')
    ) {
      setNextBtnDisabledHandler(true);
    }
  }, [isValidateInput]);

  const [nextBtnDisabledHandler, setNextBtnDisabledHandler] = useState(false);

  const totalCheck = useCallback(() => {
    if (
      EmailValidateResData === '' &&
      nicknameValidateResData === '' &&
      passwordValidateDesc === '' &&
      checkPasswordValidateDesc === '' &&
      nameValidateDesc === '' &&
      birthValidateDesc === '' &&
      requiredData.realName !== undefined &&
      isValidateInput.nick !== '' &&
      isValidateInput.birth !== '' &&
      isValidateInput.id !== '' &&
      isValidateInput.name !== '' &&
      isValidateInput.pass !== '' &&
      btnTextHandler === '인증완료'
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
    btnTextHandler,
    requiredData.realName,
  ]);

  const backSpaceCheck = useCallback(() => {
    totalCheck();
    if (location.state && location.state.googleSignupData) {
      setBtnTextHandler('인증완료');
    }
  }, [totalCheck, location.state]);

  const { current: passCheck } = useRef(
    /^(?=.*?[a-zA-Z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/
  ); /* 비밀번호는 영문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다. */
  const { current: nameCheck } = useRef(/^[a-zA-Z가-힣]{2,20}$/);
  const { current: birthCheck } = useRef(/^([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/);

  const getPassCheckNum = useCallback(
    (e) => {
      setpassCheckNum(e.target.value);
      requiredNextBtnHandler();
    },
    [setpassCheckNum, requiredNextBtnHandler]
  );

  const checkEmailValidate = useCallback(() => {
    axios.post('https://api.withyuja.com/api/auth/checkemail', requiredData).then((res) => {
      if (res.data !== '') {
        setEmailValidateResData(res.data);
      } else if (res.data === '') {
        setEmailValidateResData('');
      }
    });
  }, [requiredData]);

  const checkNicknameValidate = useCallback(() => {
    axios.post('https://api.withyuja.com/api/auth/checknickname', requiredData).then((res) => {
      if (res.data !== '') {
        setNicknameValidateResData(res.data);
      } else if (res.data === '') {
        setNicknameValidateResData('');
      }
    });
  }, [requiredData]);

  const checkPasswordValidate = useCallback(() => {
    passCheck.test(isValidateInput.pass) === false && isValidateInput.pass !== ''
      ? setPasswordValidateDesc(
          '비밀번호는 영문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다.'
        )
      : setPasswordValidateDesc('');
  }, [isValidateInput, passCheck]);

  const checkPasswordCheckValidate = useCallback(() => {
    isValidateInput.pass !== passCheckNum && passCheckNum !== ''
      ? setCheckPasswordValidateDesc('비밀번호를 확인해주세요.')
      : setCheckPasswordValidateDesc('');
  }, [isValidateInput, passCheckNum]);

  const passwordTotalCheck = useCallback(
    (e) => {
      if ((isValidateInput.pass !== undefined || '') && passCheckNum !== '') {
        if (passCheck.test(isValidateInput.pass) === false) {
          setPasswordValidateDesc(
            '비밀번호는 영문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다.'
          );
        } else if (isValidateInput.pass !== passCheckNum) {
          if (e.target.className === 'signUpPw') {
            setPasswordValidateDesc('비밀번호가 일치하지 않습니다.');
          } else {
            setPasswordValidateDesc('');
            setCheckPasswordValidateDesc('비밀번호가 일치하지 않습니다.');
          }
        } else if (passCheck.test(isValidateInput.pass) === true) {
          setPasswordValidateDesc('');
        }
        if (isValidateInput.pass === passCheckNum) {
          setCheckPasswordValidateDesc('');
        }
      } else if (passCheckNum === '') {
        setCheckPasswordValidateDesc('비밀번호가 일치하지 않습니다.');
      }
    },
    [isValidateInput, passCheck, passCheckNum]
  );

  const checkNameValidate = useCallback(() => {
    if (nameCheck.test(isValidateInput.name) === false && isValidateInput.name !== '') {
      setNameValidateDesc('이름은 2글자 이상의 영문자, 한글만 입력 가능합니다.');
    } else {
      setNameValidateDesc('');
    }
  }, [nameCheck, isValidateInput]);

  const checkBirthValidate = useCallback(() => {
    birthCheck.test(isValidateInput.birth) === false && isValidateInput.birth !== ''
      ? setBirthValidateDesc('-을 제외한 생년월일 6자리만 입력해주세요.')
      : setBirthValidateDesc('');
  }, [birthCheck, isValidateInput]);

  //유효성 검사 on/off
  useEffect(() => {
    totalCheck();
  }, [requiredData, passCheckNum, nextBtnDisabledHandler, totalCheck, securityCode]);

  /* new 유효성 검사 끝 */

  return (
    <div className='contentBox2'>
      <div className='signUpBar'>
        <div className='dot2'></div>
        <div className='dot1'></div>
        <div className='dot3'></div>
      </div>
      <div className='overlay'>
        <div className='required'>* 필수입력 정보입니다.</div>
        <table className='signUpTable'>
          <tbody className='signUpTableBody'>
            {/*구글로그인으로 왔을 때 */}
            {location.state && location.state.googleSignupData ? (
              <>
                <tr>
                  <td>
                    <input
                      className='signUpId'
                      name='username'
                      type='hidden'
                      placeholder='이메일을 입력해주세요'
                      onChange={changeValue}
                      onKeyUp={checkEmailValidate}
                      disabled={true}
                      value={
                        location.state &&
                        location.state.googleSignupData &&
                        location.state.googleSignupData.username
                      }
                      autoComplete='off'
                      maxLength='30'
                      autoFocus
                    />
                    <div className='warningBox'>{EmailValidateResData}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className='signUpPw'
                      name='password'
                      type='hidden'
                      placeholder='비밀번호'
                      onChange={changeValue}
                      onKeyUp={checkPasswordValidate}
                      disabled={true}
                      value={
                        location.state &&
                        location.state.googleSignupData &&
                        location.state.googleSignupData.password
                      }
                      autoComplete='off'
                      maxLength='15'
                    />
                    <div className='warningBox'>{passwordValidateDesc}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className='signUpPwCheck'
                      name='passwordCheckNum'
                      type='hidden'
                      placeholder='비밀번호 확인'
                      onChange={getPassCheckNum}
                      onKeyUp={checkPasswordCheckValidate}
                      disabled={true}
                      value={
                        location.state &&
                        location.state.googleSignupData &&
                        location.state.googleSignupData.password
                      }
                      autoComplete='off'
                      maxLength='15'
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
                      disabled={!!(location.state && location.state.googleSignupData.realName)}
                      value={
                        location.state &&
                        location.state.googleSignupData &&
                        location.state.googleSignupData.providerId === 'google'
                          ? location.state.googleSignupData.realName
                          : requiredData.realName
                      }
                      autoComplete='off'
                      maxLength='20'
                    />
                    <div className='warningBox'>{nameValidateDesc}</div>
                  </td>
                </tr>
              </>
            ) : (
              // 그냥 로그인으로 왔을 때
              <>
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
                      disabled={emailDisableHandler}
                      autoComplete='off'
                      maxLength='30'
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
                          autoComplete='off'
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
                          autoComplete='off'></AuthBtnBox>
                      </div>
                      <div className='warningBox'>{securityCodeValidateDesc}</div>
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
                      onKeyUp={passwordTotalCheck}
                      maxLength='15'
                      autoComplete='off'
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
                      onKeyUp={passwordTotalCheck}
                      maxLength='15'
                      autoComplete='off'
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
                      maxLength='15'
                      autoComplete='off'
                    />
                    <div className='warningBox'>{nameValidateDesc}</div>
                  </td>
                </tr>
              </>
            )}

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
                  autoComplete='off'
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
                  maxLength='19'
                  placeholder='닉네임'
                  onChange={changeValue}
                  onKeyUp={checkNicknameValidate}
                  onKeyDown={backSpaceCheck}
                  autoComplete='off'
                />
                <div className='warningBox'>{nicknameValidateResData}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='signUpNextBtnBox'>
          {nextBtnDisabledHandler === false ? (
            <Link
              to={{
                pathname: '/SignUp/NonRequired',
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
