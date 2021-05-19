import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./ResetPassword.scss";
import { Link } from "react-router-dom";
import { resetPassword } from "../../../apiService/AuthenticationService";

const ResetPassword = ({ history, location }) => {
  /* 데이터 준비 */
  const [resetPasswordData, setResetPasswordData] = useState({
    username: location.username,
    password: "",
  });

  const dataInput = useMemo(
    () => ({
      id: resetPasswordData.username,
      pass: resetPasswordData.password,
    }),
    [resetPasswordData]
  );
  /* 데이터 준비 끝 */

  /* state들 준비 */
  const [resetPassCheckNum, setResetPassCheckNum] = useState();
  const [resetPasswordDesc, setResetPasswordDesc] = useState("");
  const [resetPasswordCheckDesc, setResetPasswordCheckDesc] = useState("");
  const [resetPasswordBtnHandler, setResetPasswordBtnHandler] = useState(true);
  /* state들 준비 끝 */

  const { current: passCheck } = useRef(
    /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?=.*?[0-9]).{8,}$/
  ); /* 비밀번호는 소문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다. */

  const changeValue = useCallback(
    (e) => {
      setResetPasswordData((resetPasswordData) => ({
        ...resetPasswordData,
        [e.target.name]: e.target.value,
      }));
    },
    [setResetPasswordData]
  );

  const passwordTotalCheck = useCallback(
    (e) => {
      if (resetPasswordData.password !== "" && resetPassCheckNum !== "") {
        if (passCheck.test(dataInput.pass) === false) {
          setResetPasswordDesc("비밀번호는 소문자, 숫자, 하나 이상의 특수문자를 포함한 8글자 이상이여야 합니다.");
          setResetPasswordBtnHandler(true);
        } else if (dataInput.pass !== resetPassCheckNum) {
          if (e.target.className === "resetPasswordInput") {
            setResetPasswordDesc("비밀번호를 확인해주세요.");
            setResetPasswordBtnHandler(true);
          } else {
            setResetPasswordCheckDesc("비밀번호를 확인해주세요.");
            setResetPasswordBtnHandler(true);
          }
        } else if (passCheck.test(dataInput.pass) === true) {
          setResetPasswordDesc("");
        }
        if (dataInput.pass === resetPassCheckNum) {
          setResetPasswordCheckDesc("");
          setResetPasswordBtnHandler(false);
        }
      } else {
        setResetPasswordBtnHandler(true);
      }
    },
    [dataInput, passCheck, resetPassCheckNum, resetPasswordData]
  );

  const getResetPassCheckNum = (e) => {
    setResetPassCheckNum(e.target.value);
  };

  /* 데이터 db로 넘기기 */

  const insertResetPasswordData = useCallback(() => {
    const data = {
      ...resetPasswordData,
    };

    resetPassword(data)
      .then((res) => {
        console.log("서버응답", res);
        if (res) {
          console.log("비밀번호 변경 성공");
          history.push("/");
        } else {
          console.log("변경 실패");
        }
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
    console.log("insertResetPasswordData의 data값", data);
  }, [resetPasswordData, history]);

  /* 데이터 db로 넘기기 끝 */

  useEffect(() => {}, [resetPasswordData, setResetPasswordData, dataInput, passwordTotalCheck]);

  return (
    <div className='resetPasswordFrag'>
      <div className='resetPasswordTitleBox'>
        <Link className='resetPasswordTitle' to='/'>
          유자 비밀번호 찾기
        </Link>
      </div>

      <div className='resetPasswordContentBox'>
        <div className='overlay'>
          <div className='resetPasswordDescBox'>
            사용하실 <span>새로운 비밀번호</span>를 입력해주세요.
          </div>
          <div className='labelWrapper'>
            <label htmlFor='resetPasswordInput'>새로운 비밀번호</label>
          </div>
          <input
            className='resetPasswordInput'
            name='password'
            type='password'
            placeholder='비밀번호'
            autoComplete='off'
            onChange={changeValue}
            onKeyUp={passwordTotalCheck}
          />
          <div className='warningBox'>{resetPasswordDesc}</div>
          <div className='labelWrapper'>
            <label htmlFor='resetPasswordInputCheck'>새로운 비밀번호 확인</label>
          </div>
          <input
            className='resetPasswordInputCheck'
            name='passwordCheckNum'
            type='password'
            placeholder='비밀번호 확인'
            onChange={getResetPassCheckNum}
            onKeyUp={passwordTotalCheck}
            autoComplete='off'
          />
          <div className='warningBox'>{resetPasswordCheckDesc}</div>
          <div className='resetPasswordSubmitBtnBox'>
            <button
              type='submit'
              className='btn btn-warning'
              onClick={insertResetPasswordData}
              disabled={resetPasswordBtnHandler}
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
