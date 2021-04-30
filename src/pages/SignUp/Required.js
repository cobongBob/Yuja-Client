import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Required = () => {

  const [requiredData, setrequiredData] = useState({
    username: '',
    password: '',
    realName: '',
    bday: '',
    nickname: ''
  });

  const changeValue = (e) => {
    setrequiredData({
      ...requiredData,
      [e.target.name] : e.target.value
    })
  };

  const dataToNext = () => {
  }

  return (

    <div className="contentBox1">
      <div className="overlay">
      <div className="required">
        * 필수입력 정보입니다.
      </div>
      <table className="signUpTable">
        <tr>
          <td>
            <div className="labelWrapper">
              <label htmlFor="signUpId">이메일</label>
            </div>
            <input
              className="signUpId"
              name='username'
              type="email"
              placeholder="아이디(이메일)"
              onChange={changeValue}
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <div className="labelWrapper">
              <label htmlFor="signUpPw">비밀번호</label>
            </div>
            <input
              className="signUpPw"
              name='password'
              type="password"
              placeholder="비밀번호"
              onChange={changeValue}
              required
            /></td>
        </tr>
        <tr>
          <td>
            <div className="labelWrapper">
              <label htmlFor="signUpPwCheck">비밀번호 확인</label>
            </div>
            <input
              className="signUpPwCheck"
              type="password"
              placeholder="비밀번호 확인"
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <div className="labelWrapper">
              <label htmlFor="signUpName">이름(실명)</label>
            </div>
            <input
              className="signUpName"
              name='realName'
              type="text"
              placeholder="이름(실명)"
              onChange={changeValue}
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <div className="labelWrapper">
              <label htmlFor="signUpBirthdate">생년월일</label>
            </div>
            <input
              className="signUpBirthdate"
              name='bday'
              type="tel"
              placeholder="생년월일(-을 제외한 6자리)"
              onChange={changeValue}
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <div className="labelWrapper">
              <label htmlFor="signUpNickname">닉네임</label>
            </div>
            <input
              className="signUpNickname"
              name='nickname'
              type="text"
              placeholder="닉네임"
              onChange={changeValue}
              required
            />
          </td>
        </tr>
      </table>
        <div className="signUpNextBtnBox">
          <Link
            to={{
              pathname: '/SignUp1/NonRequired',
              state: {
                requiredData:requiredData
              },
            }}
            className="btn btn-warning"
          >
            다음</Link>
        </div>
      </div>
    </div>

  );
};

export default Required;
