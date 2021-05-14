import React, { useState } from 'react';
import "./SignUp1.scss";

const AuthBtnBox = (props) => {


  if (props.timerSet === false) {
    return (
      <>
        <div className='authenticationCodeSend'>
          <button
            className='btn btn-warning'
            id='authenticationCodeSend'
            onClick={props.changeTimeSet}
            disabled={props.disabledHandler}
          >
            {props.btnTextHandler}
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='authenticationCodeResend'>
          <button
            className='btn btn-warning'
            id='authenticationCodeResend'
            onClick={props.changeStartTimer}
          >
            재발송
          </button>
        </div>
        <div className='authenticationBtn'>
          <button
            className='btn btn-warning'
            id='authenticationBtn'
            onClick={props.checkCodes}
          >
            인증
          </button>
        </div>
      </>
    );
  }
};

export default AuthBtnBox;
