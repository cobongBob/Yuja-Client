import React, { useEffect, useRef, useState } from "react";
import '../../components/scss/SignUp1.scss';
import Agreement from './Agreement';
import Filter from './Filter';

const SignUp1 = () => {

  return (

    <div className="SignUpFrag">
      <header className="SignUpHeader">
        <img className="SignUpIcon" src="/img/parts_pic/yuzu05.png" />{" "}
        <div className="header-title">유자 회원가입</div>
      </header>
      {/*<div className="signUpBar">*/}
      {/*  <div className="bar1"></div>*/}
      {/*  <div className="bar2"></div>*/}
      {/*  <div className="bar3"></div>*/}
      {/*  <div className="bar4"></div>*/}
      {/*  <div className="mvBar"></div>*/}
      {/*</div>*/}
      <content>
        <div className="contentBox">

          <div className="contentBox1">
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
          </div>

          <div className="contentBox2">
            <div className="required2">
              * 선택입력 정보입니다.
            </div>
            <table className="signUpTable">
              <tr>
                <td>
                  <div className="labelWrapper">
                    <label htmlFor="signUpProfilePic">프로필 사진</label>
                  </div>
                  <input
                  className='signUpProfilePic'
                  type='file'
                  placeholder='프로필 사진'
                /></td>
              </tr>
              <tr>
                <td>
                  <div className="labelWrapper">
                    <label htmlFor="signUpAddress">주소</label>
                  </div>
                  <input
                  className='signUpAddress'
                  type='text'
                  placeholder='주소'
                /></td>
              </tr>
              <tr>
                <td>
                  <div className="labelWrapper">
                    <label htmlFor="signUpTel">연락처</label>
                  </div>
                  <input
                    className='signUpTel'
                    type='tel'
                    placeholder='연락처'
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="signUpLabel" htmlFor="YoutuberCheck">
                    유튜버이신가요? {" "}
                    <input
                      className='signUpYoutuber'
                      id='YoutuberCheck'
                      type='checkbox'
                    />
                </label>
                </td>
              </tr>
            </table>
          </div>

          <div className="contentBox3">
            <Agreement/>
          </div>
        </div>
      </content>
      <footer>
      </footer>
    </div>
  );
};

export default SignUp1;
