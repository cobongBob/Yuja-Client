import React, { useState, useEffect } from 'react';
import './AuthBtnBox.scss';

const AuthBtnBox = (props) => {

  if(props.timerSet === false) {
    return (
      <>
        <button
          className='btn btn-warning'
          id='authenticationCodeSend'
          onClick={props.changeTimeSet}
        >
          인증번호 발송
        </button>
      </>
    )
  } else {
    return (
      <>
        <button
          className='authCodeResendBtn'
          onClick={props.changeStartTimer}
        >
          재발송
        </button>
        <button
          className='authBtn'
          onClick={props.changeTimeSet}
        >
          인증
        </button>
      </>
    )
  }
}

export default AuthBtnBox;