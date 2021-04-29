import React from 'react';
import { Link } from 'react-router-dom';

const Required = () => {
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
              type="email"
              placeholder="아이디(이메일)"
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
              type="password"
              placeholder="비밀번호"
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
              type="text"
              placeholder="이름(실명)"
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
              type="tel"
              placeholder="생년월일(-을 제외한 6자리)"
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
              type="text"
              placeholder="닉네임"
            />
          </td>
        </tr>
      </table>
        <div className="signUpNextBtnBox">
          <Link to='/SignUp1/NonRequired' className="btn btn-warning">다음</Link>
        </div>
      </div>
    </div>

  );
};

export default Required;
