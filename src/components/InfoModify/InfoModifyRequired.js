import React, { useCallback, useEffect, useState } from 'react';
import './InfoModifyRequired.scss';
import { Link } from 'react-router-dom';
import { getLoggedInUserData, isUserLoggedIn } from '../../apiService/AuthenticationService';
import { ToastPreventAccess } from '../../modules/ToastModule';
import { getUserData } from '../../apiService/UserApiService';

const InfoModifyRequired = ( { history } ) => {

  // /* 잘못된 접근 막기 */
  //  if (history.action === "POP") {
  //    ToastPreventAccess("❌ 잘못된 접근 입니다.");
  //    history.replace("/");
  //  } else if(isUserLoggedIn === false) {
  //    ToastPreventAccess("❌ 먼저 로그인 하셔야 합니다.");
  //   history.replace("/");
  //  }

  const loggedInUserData = getLoggedInUserData()
  console.log(loggedInUserData)
  const userId = loggedInUserData && loggedInUserData.id ? loggedInUserData.id : null
  const [userData, setUserData] = useState();

  useEffect(()=> {
    getUserData(userId).then((res) => {
      console.log('res.data의 값', res.data)
      setUserData(res.data)
    });
  }, []);

  console.log('userData의 값', userData)

  const onChange = useCallback((e)=> {
    setUserData({

    })
  }, [])

  return userData && (
    <div className='infoModifyFrag'>
      <div className='infoModifyTitleBox'>
        <Link className='infoModifyTitle' to='/'>
          유자 회원정보 수정
        </Link>
      </div>
        <div className='infoModifyContentBox'>
          <div className='overlay'>
            <div className='infoModifyDescBoxDescBox'>
              <span>{userData.nickname}</span>님 정보수정
            </div>
            <div className='required'>* 필수입력 정보입니다.</div>

            <table className='infoModifyTable'>

              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyId'>이메일</label>
                  </div>
                  <input
                    className='infoModifyId'
                    name='username'
                    type='email'
                    placeholder='아이디(이메일)'
                    autoComplete='off'
                    disabled={true}
                    value={userData.username}
                    autoFocus
                  />
                  <div className='warningBox'>1</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyName'>이름(실명)</label>
                  </div>
                  <input
                    className='infoModifyName'
                    name='realName'
                    type='text'
                    placeholder='이름(실명)'
                    autoComplete='off'
                    disabled={true}
                    value={userData.realName}
                  />
                  <div className='warningBox'>4</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyNickname'>닉네임</label>
                  </div>
                  <input
                    className='infoModifyNickname'
                    name='nickname'
                    type='text'
                    maxLength='20'
                    placeholder='닉네임'
                    autoComplete='off'
                    value={userData.nickname}
                  />
                  <div className='warningBox'>{6}</div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyBirthdate'>생년월일</label>
                  </div>
                  <input
                    className='infoModifyBirthdate'
                    name='bday'
                    type='text'
                    maxLength='6'
                    placeholder='생년월일(-을 제외한 6자리)'
                    autoComplete='off'
                  />
                  <div className='warningBox'>5</div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyNewPw'>새로운 비밀번호</label>
                  </div>
                  <input
                    className='infoModifyNewPw'
                    name='password'
                    type='password'
                    placeholder='비밀번호'
                    autoComplete='off'
                  />
                  <div className='warningBox'>2</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='labelWrapper'>
                    <label htmlFor='infoModifyPwCheck'>새로운 비밀번호 확인</label>
                  </div>
                  <input
                    className='infoModifyPwCheck'
                    name='infoModifyPwCheck'
                    type='password'
                    placeholder='비밀번호 확인'
                    autoComplete='off'
                  />
                  <div className='warningBox'>3</div>
                </td>
              </tr>

            </table>
            <div className='infoModifyRequiredNextBtnBox'>
            <Link
              to={{
                pathname: "/InfoModifyNonRequired",
                state: {
                  requiredData: '',
                },
              }}
              className='btn btn-warning'
              //onClick={checkRequiredUserData}
            >
              다음
            </Link>
          </div>
        </div>
      <footer className='infoModifyFooter'></footer>
    </div>
  </div>
  );

};

export default InfoModifyRequired;