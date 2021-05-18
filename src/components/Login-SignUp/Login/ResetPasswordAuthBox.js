import React, { useCallback, useState } from 'react';
import "./ResetPasswordAuthBox.scss";
import * as auth from '../../../apiService/AuthenticationService';


const ResetPasswordAuthBox = (props) => {
  if (props.resetPasswordSendBtnHandler === true) {
    return (
      <>
        <div className='authenticationCodeSend'>
          <button
            className='btn btn-warning'
            id='authenticationCodeSend'
            onClick={props.sendResetPasswordSecurityCode}
            disabled={props.authDisabledHandler}
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
            onClick={props.sendResetPasswordSecurityCode}
          >
            재발송
          </button>
        </div>
        <div className='authenticationBtn'>
          <button
            className='btn btn-warning'
            id='authenticationBtn'
            onClick={props.resetPasswordCheckCodes}
          >
            인증
          </button>
        </div>
      </>
    );
  }
};

export default ResetPasswordAuthBox;
