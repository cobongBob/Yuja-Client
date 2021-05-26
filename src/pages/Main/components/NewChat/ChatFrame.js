import React, { useCallback, useEffect, useRef, useState } from "react";
import './ChatFrame.scss'
import SmallChat from '../Chat/SmallChat';
import { useSelector } from 'react-redux';

const ChatFrame = (props) => {
  console.log('ChatFrame 실행')

  window.onkeydown = function(e) {
    console.log('esc 작동2')
    if(e.keyCode === 27) {
      props.setModalIsOpen(false)
    }
  };

  const { userLoginStatus } = useSelector((state) => state.loginReducer);

   if(props.modalIsOpen === true && userLoginStatus === true) {

     return (
       <React.Fragment>
         <div className='chatFrameFrag'>
           <div className='chatFrameOverlay'>
             <SmallChat/>
           </div>
         </div>
       </React.Fragment>
     );
   }

};

export default ChatFrame;