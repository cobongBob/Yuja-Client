import React, { useCallback, useEffect, useRef, useState } from "react";
import './ChatFrame.scss'
import SmallChat from '../Chat/SmallChat';

const ChatFrame = (props) => {
  console.log('ChatFrame 실행')

   if(props.modalIsOpen === true) {
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