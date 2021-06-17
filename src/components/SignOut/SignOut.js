import React, { useCallback, useEffect, useState } from "react";
import "./SignOut.scss";
import { Link } from "react-router-dom";
import { executeJwtAuthenticationService, getLoggedInUserData } from "../../apiService/AuthenticationService";
import * as auth from "../../apiService/AuthenticationService";
import { deleteUser, getUserData } from "../../apiService/UserApiService";
import { userLogin, userLogout } from "../../redux/redux-login/loginReducer";
import { useDispatch } from "react-redux";
import { ToastTopRight } from "../../modules/ToastModule";
import GoogleLogin from "react-google-login";
import googleLoginIcon from "../Login-SignUp/Login/googleLoginIcon2.svg";
import KakaoLogin from 'react-kakao-login';
import kakaoLoginIcon from '../Login-SignUp/Login/kakao_login_medium_wide.png';

const SignOut = ({ history }) => {
  const loggedInUserData = getLoggedInUserData();
  const [loginData, setLoginData] = useState({
    id: "",
    username: "",
    password: "",
    providedId: loggedInUserData.providedId,
  });
  const [passwordDesc, setPasswordDesc] = useState();
  const [getProvider, setGetProvider] = useState();
  const [googleSubmitHandler, setGoogleSubmitHandler] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData(loggedInUserData.id).then((res) => {
      setGetProvider(res.data.provider);
    });
  }, [loggedInUserData.id]);

  const inputHandler = useCallback(
    (e) => {
      setLoginData({
        ...loginData,
        id: loggedInUserData.id,
        username: loggedInUserData.username,
        [e.target.name]: e.target.value,
      });
    },
    [loginData, loggedInUserData.username, loggedInUserData.id]
  );

  const loginHandler = useCallback(async () => {
    let userData = null;
    await executeJwtAuthenticationService(loginData)
      .then(async (res) => {
        userData = await auth.registerSuccessfulLoginForJwt(res.data);
        await deleteUser(loginData.id);
        await userLogout().then((respon) => {
          ToastTopRight("탈퇴 처리가 완료 되었습니다.");
          dispatch(respon);
        });
        history.push("/");
      })
      .catch(() => {
        setPasswordDesc("비밀번호를 확인해주세요.");
      });
    return {
      payload: userData,
    };
  }, [loginData, setPasswordDesc, history, dispatch]);

  const resGoogle = useCallback(
    async (response) => {
      await auth
        .googleLoginService(response)
        .then((res) => {
          userLogin(res).then((respon) => {
            dispatch(respon);
            setGoogleSubmitHandler(false);
          });
        })
        .catch(() => {
          setPasswordDesc("오류가 발생했습니다.");
        });
    },
    [dispatch, setPasswordDesc]
  );

  const resKakao = useCallback(
    async (response) => {
      await auth
        .kakaoLoginService(response)
        .then((res) => {
          userLogin(res).then((respon) => {
            dispatch(respon);
            setGoogleSubmitHandler(false);
          });
        })
        .catch(() => {
          setPasswordDesc("오류가 발생했습니다.");
        })
    },
    [dispatch, setPasswordDesc]
  );

  const googleSignOut = useCallback(async () => {
    await deleteUser(loggedInUserData.id);
    await userLogout()
      .then((respon) => {
        ToastTopRight("탈퇴 처리가 완료 되었습니다.");
        dispatch(respon);
      })
      .catch(() => {
        setPasswordDesc("비밀번호를 확인해주세요.");
      });
    history.push("/");
  }, [dispatch, history, loggedInUserData.id]);

  // 구글 아이콘 스타일
  const customStyle = {
    background: "royalblue",
    height: "40px",
    width: "70%",
    fontSize: "14px",
    color: "white",
    lineHeight: "1px",
    marginTop: "10px",
    marginBottom: "12PX",
    borderRadius: "3px",
    borderStyle: "none",
  };

  return (
    <div className='signOutFrag'>
      <div className='signOutTitleBox'>
        <Link className='signOutTitle' to='/'>
          유자 회원탈퇴
        </Link>
      </div>
      <div className='signOutContentBox'>
        <div className='overlay'>
          {getProvider === null || getProvider === undefined || getProvider === "" ? (
            <div className='signOutBox'>
              <div className='signOutDescBox'>
                <span>{loggedInUserData.nickname}</span>
                님,
                <br />
                회원 탈퇴시 게시물 등을 포함한
                <br />
                모든 이용 정보는 약관에 따라 1년간 보관 됩니다.
                <br />
                정보 즉시 삭제는 관리자에게 문의하세요.
                <br />
                <br />
                완전 삭제 이후에는 <span>복구</span>가 불가능합니다.
              </div>
              <div className='labelWrapper'>
                <label className='beforeModifyPasswordLabel' htmlFor='password' autoFocus='on'>
                  탈퇴 하시려면 비밀번호를 입력해주세요.
                </label>
              </div>
              <input
                className='beforeModifyPassword'
                name='password'
                type='password'
                placeholder='비밀번호'
                autoComplete='off'
                onChange={inputHandler}
                maxLength='15'
                autoFocus
              />
              <div className='warningBox'>{passwordDesc}</div>
              <div className='beforeModifyBtnBox'>
                <input type='submit' className='btn btn-warning' value='회원탈퇴' onClick={loginHandler}></input>
              </div>
            </div>
          ) : (
            <div className='signOutBox'>
              <div className='signOutDescBox'>
                <span>{loggedInUserData.nickname}</span>
                님,
                <br />
                회원 탈퇴시 게시물 등을 포함한
                <br />
                모든 이용 정보는 약관에 따라 1년간 보관 됩니다.
                <br />
                정보 즉시 삭제는 관리자에게 문의하세요.
                <br />
                <br />
                완전 삭제 이후에는 <span>복구</span>가 불가능합니다.
                <br />
                <br />
                탈퇴 하시려면 다시 한번 로그인 해주세요.
              </div>
              <div className='SignOutGoogleBtnBox'>
                {getProvider === 'google' ?
                  <GoogleLogin
                    className='googleLoginBtn'
                    clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY}
                    buttonText='구글 로그인'
                    onSuccess={resGoogle}
                    onFailure={resGoogle}
                    cookiePolicy={"single_host_origin"}
                    render={(renderProps) => (
                      <button onClick={renderProps.onClick} style={customStyle}>
                        <img src={googleLoginIcon} alt='안보임' className='googleIcon' />
                        구글 로그인
                      </button>
                    )}
                  />
                  :
                  <KakaoLogin
                    token={process.env.REACT_APP_KAKAO_OAUTH_KEY}
                    onSuccess={resKakao}
                    onFail={resKakao}
                    getProfile={true}
                    render={(renderProps) => (
                      <img src={kakaoLoginIcon} onClick={renderProps.onClick} className='ModifykakaoLoginIcon' alt="" />
                    )}
                  />
                }
              </div>
              <div className='warningBox'>{passwordDesc}</div>
              <div className='beforeModifyBtnBox'>
                <input
                  type='submit'
                  className='btn btn-warning'
                  value='회원탈퇴'
                  onClick={() => {
                    googleSignOut();
                  }}
                  disabled={googleSubmitHandler}
                ></input>
              </div>
            </div>
          )}
        </div>
        <footer className='signOutFooter'></footer>
      </div>
    </div>
  );
};

export default SignOut;
