import React, { useCallback, useState } from "react";
import './SignOut.scss'
import { Link } from 'react-router-dom';
import { executeJwtAuthenticationService, getLoggedInUserData } from '../../apiService/AuthenticationService';
import * as auth from '../../apiService/AuthenticationService';
import { deleteUser } from '../../apiService/UserApiService';
import { userLogin, userLogout } from '../../redux/redux-login/loginReducer';
import { useDispatch } from 'react-redux';
import { ToastTopRight } from '../../modules/ToastModule';
import GoogleLogin from 'react-google-login';
import googleLoginIcon from '../Login-SignUp/Login/googleLoginIcon2.svg';

const SignOut = ({ history }) => {

  const loggedInUserData = getLoggedInUserData();
  const [loginData, setLoginData] = useState({
    id:'',
    username: '',
    password: '',
    providedId: loggedInUserData.providedId,
  });
  const [passwordDesc, setPasswordDesc] = useState();
  const [getProviderId, setGetProviderId] = useState();
  const [googleSubmitHandler, setGoogleSubmitHandler] = useState(true);
  const dispatch = useDispatch();

  console.log('SignOut loggedInUserData',loggedInUserData)

  const inputHandler = useCallback(
    (e) => {
      setLoginData({
        ...loginData,
        id: loggedInUserData.id,
        username: loggedInUserData.username,
        [e.target.name]: e.target.value,
      });
    },
    [loginData, loggedInUserData.username]
  );

  const loginHandler = useCallback(async () => {
    console.log('탈퇴 loginhandler 실행')
    console.log(loginData)
    let userData = null;
    await executeJwtAuthenticationService(loginData)
      .then(async (res) => {
        userData = await auth.registerSuccessfulLoginForJwt(res.data);
        console.log(loginData.id)
        await deleteUser(loginData.id)
        await userLogout().then((respon)=> {
          ToastTopRight("탈퇴 처리가 완료 되었습니다.");
          dispatch(respon);
        })
        history.push("/");
      })
      .catch(() => {
        setPasswordDesc("비밀번호를 확인해주세요.");
      });
    return {
      payload: userData,
    };
  }, [loginData, setPasswordDesc, history]);

  const resGoogle = useCallback(async (response) => {
      console.log('탈퇴 resGoogle 실행')
      await auth.googleLoginService(response).then((res) => {
        userLogin(res).then((respon) => {
          dispatch(respon);
          setGoogleSubmitHandler(false)
        });
      }).catch(()=> {
        setPasswordDesc("오류가 발생했습니다.");
      })
    },
    [dispatch, setPasswordDesc]
  );

  const googleSignOut = useCallback(async () => {
    console.log('탈퇴 googleSignOut 실행')
    await deleteUser(loggedInUserData.id)
    await userLogout().then((respon)=> {
      ToastTopRight("탈퇴 처리가 완료 되었습니다.");
      dispatch(respon);
    }).catch(() => {
      setPasswordDesc("비밀번호를 확인해주세요.");
    });
    history.push("/");
  }, [loginData])

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

  return(
    <div className='signOutFrag'>
      <div className='signOutTitleBox'>
        <Link className='signOutTitle' to='/'>
          유자 회원탈퇴
        </Link>
      </div>
      <div className='signOutContentBox'>
        <div className='overlay'>
          {loginData.providedId === null || undefined ?
            <div className='signOutBox'>
              <div className='signOutDescBox'>
                <span>{loggedInUserData.nickname}</span>
                님, 회원 탈퇴시 게시물 등을 포함한
                <br />
                유자 내 모든 이용 정보는 1년간 보관 됩니다.
                <br />
                <br />
                삭제 이후에는 복구가 불가능합니다.
              </div>
              <div className='labelWrapper'>
                <label
                  className='beforeModifyPasswordLabel'
                  htmlFor='password'
                  autoFocus='on'>
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
                autoFocus
              />
              <div className='warningBox'>{passwordDesc}</div>
              <div className='beforeModifyBtnBox'>
                <input
                  type='submit'
                  className='btn btn-warning'
                  value='회원탈퇴'
                  onClick={loginHandler}
                >
                </input>
              </div>
            </div>
            :
            <div className='signOutBox'>
              <div className='signOutDescBox'>
                <span>{loggedInUserData.nickname}</span>
                님, 회원 탈퇴시 게시물 등을 포함한
                <br />
                유자 내 모든 이용 정보는 1년간 보관 됩니다.
                <br />
                <br />
                삭제 이후에는 <span>복구</span>가 불가능합니다.
                <br />
                <br />
                탈퇴 하시려면 다시 한번 로그인 해주세요.
              </div>
              <div className='SignOutGoogleBtnBox'>
              <GoogleLogin
                className='googleLoginBtn'
                clientId='373267940764-jujlpjtg3qtd21bg6496vaj7k9ooj56e.apps.googleusercontent.com'
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
              </div>
              <div className='warningBox'>{passwordDesc}</div>
              <div className='beforeModifyBtnBox'>
                <input
                  type='submit'
                  className='btn btn-warning'
                  value='회원탈퇴'
                  onClick={resGoogle}
                  disabled={googleSubmitHandler}
                  onClick={googleSignOut}
                >
                </input>
              </div>
            </div>
          }
        </div>
        <footer className='signOutFooter'>
        </footer>
      </div>
    </div>
  )

}

export default SignOut;