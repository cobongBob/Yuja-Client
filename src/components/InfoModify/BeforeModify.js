import React, { useCallback, useEffect, useState } from "react";
import "./BeforeModify.scss";
import { Link } from "react-router-dom";
import {
  executeJwtAuthenticationService,
  getLoggedInUserData,
  isUserLoggedIn,
} from "../../apiService/AuthenticationService";
import * as auth from "../../apiService/AuthenticationService";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/redux-login/loginReducer";
import { getUserData } from "../../apiService/UserApiService";
import GoogleLogin from "react-google-login";
import googleLoginIcon from "../Login-SignUp/Login/googleLoginIcon2.svg";
import { ToastPreventAccess } from "../../modules/ToastModule";
import KakaoLogin from 'react-kakao-login';
import kakaoLoginIcon from "../Login-SignUp/Login/kakao_login_medium_wide.png";

const BeforeModify = ({ history }) => {
  /* 잘못된 접근 막기 */
  if (history.action === "POP") {
    ToastPreventAccess("❌ 잘못된 접근 입니다.");
    history.replace("/");
  } else if (isUserLoggedIn === false) {
    ToastPreventAccess("❌ 먼저 로그인 하셔야 합니다.");
    history.replace("/");
  }

  const loggedInUserData = getLoggedInUserData();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { authorities } = useSelector((state) => state.loginReducer);
  const [passwordDesc, setPasswordDesc] = useState();
  const [getProvider, setGetProvider] = useState();
  const dispatch = useDispatch();
  const userId = loggedInUserData && loggedInUserData.id ? loggedInUserData.id : null;

  const inputHandler = useCallback(
    (e) => {
      setLoginData({
        ...loginData,
        username: loggedInUserData.username,
        [e.target.name]: e.target.value,
      });
    },
    [loginData, loggedInUserData.username]
  );

  const loginHandler = useCallback(async () => {
    let userData = null;
    await executeJwtAuthenticationService(loginData)
      .then(async (res) => {
        userData = await auth.registerSuccessfulLoginForJwt(res.data);
        history.push("/InfoModify");
      })
      .catch(() => {
        setPasswordDesc("비밀번호를 확인해주세요.");
      });
    return {
      payload: userData,
    };
  }, [loginData, setPasswordDesc, history]);

  const resGoogle = useCallback(
    async (response) => {
      await auth
        .googleLoginService(response)
        .then((res) => {
          userLogin(res).then((respon) => {
            dispatch(respon);
            history.push("/InfoModify");
          });
        })
        .catch(() => {
          setPasswordDesc("비밀번호를 확인해주세요.");
        });
    },
    [dispatch, setPasswordDesc, history]
  );

  const resKakao = useCallback(
    async (response) => {
      await auth.kakaoLoginService(response)
        .then((res) => {
          userLogin(res).then((respon) => {
            dispatch(respon);
            history.push("/InfoModify");
          });
      })
        .catch(() => {
          setPasswordDesc("비밀번호를 확인해주세요.");
        })
    },
    [dispatch, history, setPasswordDesc]
  );

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

  useEffect(() => {
    getUserData(userId).then((res) => {
      setGetProvider(res.data.provider);
    });
  }, [userId]);

  return (
    <div className='BeforeModifyFrag'>
      <div className='beforeModifyTitleBox'>
        <Link className='beforeModifyTitle' to='/'>
          유자 회원정보 수정
        </Link>
      </div>
      <div className='beforeModifyContentBox'>
        <div className='overlay'>
          {getProvider === null || getProvider === undefined || getProvider === "" ? (
            <div className='modifyBox'>
              <div className='beforeModifyDescBoxDescBox'>
                <span>{loggedInUserData.nickname}</span>
                님의 회원정보를 안전하게 <br />
                보호하기 위해 비밀번호를 한번 더 확인해주세요.
              </div>
              <div className='labelWrapper'>
                <label className='beforeModifyPasswordLabel' htmlFor='password' autoFocus='on'>
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
                maxLength='15'
              />
              <div className='warningBox'>{passwordDesc}</div>
              <div className='beforeModifyBtnBox'>
                <input type='submit' className='btn btn-warning' value='비밀번호 확인' onClick={loginHandler}></input>
              </div>
              <div className='beforeModifyOtherBoxDesc'>다른 서비스가 필요하신가요?</div>
              <div className='beforeModifyOtherBox'>
                {authorities && !authorities.includes("YOUTUBER") ? (
                  <Link to='/YoutuberRequest' className='btn btn-warning' name='YoutuberRequestBtn'>
                    유튜버 인증
                  </Link>
                ) : (
                  ""
                )}
                <Link to='/PasswordModify' className='btn btn-warning' name='passwordModifyBtn'>
                  비밀번호 변경
                </Link>
                <Link to='/SignOut' className='btn btn-warning' name='signOutBtn'>
                  회원탈퇴
                </Link>
              </div>
            </div>
          ) : (
            /* ===================================== 여기부터 소셜 유저일때 */
            <div className='modifyBox'>
              <div className='beforeModifyDescBoxDescBox'>
                <span>{loggedInUserData.nickname}</span>
                님의 회원정보를 안전하게 <br />
                보호하기 위해 한번 더 로그인해주세요.
              </div>
              <div className='labelWrapper'></div>
              <div className='warningBox'>{passwordDesc}</div>
              <div className='beforeModifyBtnBox'>
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
                  <img src={kakaoLoginIcon} onClick={renderProps.onClick} className='ModifykakaoLoginIcon'/>
                  )}
                  />
                }
              </div>
              <div className='beforeModifyOtherBoxDesc'>다른 서비스가 필요하신가요?</div>
              <div className='beforeModifyOtherBox'>
                {authorities && !authorities.includes("YOUTUBER") ? (
                  <Link to='/YoutuberRequest' className='btn btn-warning' name='YoutuberRequestBtn'>
                    유튜버 인증
                  </Link>
                ) : (
                  ""
                )}
                <Link to='/SignOut' className='btn btn-warning' name='signOutBtn'>
                  회원탈퇴
                </Link>
              </div>
            </div>
          )}
        </div>
        <footer className='beforeModifyFooter'></footer>
      </div>
    </div>
  );
};

export default BeforeModify;
