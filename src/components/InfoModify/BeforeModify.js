import React, { useCallback, useState } from 'react';
import './BeforeModify.scss';
import { Link } from 'react-router-dom';
import {
  executeJwtAuthenticationService,
  getLoggedInUserData,
} from '../../apiService/AuthenticationService';
import { useDispatch } from 'react-redux';
import * as auth from '../../apiService/AuthenticationService';

const BeforeModify = ( { history } ) => {

  /* 잘못된 접근 막기 */
  // if (history.action === "POP") {
  //   ToastPreventAccess("❌ 잘못된 접근 입니다.");
  //   history.replace("/");
  // } else if(isUserLoggedIn === false) {
  //   ToastPreventAccess("❌ 먼저 로그인 하셔야 합니다.");
  //   history.replace("/");
  // }

  const loggedInUserData = getLoggedInUserData()
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [passwordDesc, setPasswordDesc] = useState();

  const inputHandler = useCallback(
    (e) => {
      setLoginData({
        ...loginData,
        username: loggedInUserData.username,
        [e.target.name]: e.target.value,
      });
    },[loginData]);

  const loginHandler = useCallback( async () => {
    let userData = null;
    await executeJwtAuthenticationService(loginData).then(async (res) => {
      userData = await auth.registerSuccessfulLoginForJwt(res.data);
      history.push('/InfoModifyRequired')
    }).catch(() => {
      setPasswordDesc('비밀번호를 확인해주세요.');
    });
    return {
      payload: userData,
    };
  }, [loginData, setPasswordDesc]);

  return (
    <div className='BeforeModifyFrag'>
      <div className='beforeModifyTitleBox'>
        <Link className='beforeModifyTitle' to='/'>
          유자 회원정보 수정
        </Link>
      </div>
      <div className='beforeModifyContentBox'>
        <div className='overlay'>
          <div className='modifyBox'>
            <div className='beforeModifyDescBoxDescBox'>
              <span>{loggedInUserData.nickname}</span>
              님의 회원정보를 안전하게 보호하기 위해<br/>
              비밀번호를 한번 더 확인해주세요.
            </div>
            <div className='labelWrapper'>
              <label
                className='beforeModifyPasswordLabel'
                htmlFor='password'
                autoFocus='on'>
                비밀번호 입력
              </label>
            </div>
            <input
              className='beforeModifyPassword'
              name='password'
              type='password'
              placeholder='비밀번호'
              autoComplete='off'
              onChange={inputHandler}
              autoFocus
            />
            <div className='warningBox'>
              {passwordDesc}
            </div>
            <div className='beforeModifyBtnBox'>
              <input
                type='submit'
                className='btn btn-warning'
                value='비밀번호 확인'
                onClick={loginHandler}
              >
              </input>
            </div>
          </div>
        </div>
        <footer className='beforeModifyFooter'></footer>
      </div>
    </div>
  );
};

export default BeforeModify;
