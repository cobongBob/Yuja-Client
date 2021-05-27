import React from "react";
import "./SignUpEnd.scss";
import { ToastPreventAccess } from "../../../modules/ToastModule";

const SignUpEnd = ({ history }) => {
  if (history.action === "POP") {
    ToastPreventAccess("❌ 잘못된 접근 입니다.");
    history.replace("/");
  }
  return (
    <div className='contentBox2'>
      <div className='signUpBar'>
        <div className='dot2'></div>
        <div className='dot3'></div>
        <div className='dot1'></div>
      </div>
      <div className='overlay'>
        <div className='signUpEndTitle'>회원가입을 축하합니다!</div>
      </div>
    </div>
  );
};

export default SignUpEnd;
