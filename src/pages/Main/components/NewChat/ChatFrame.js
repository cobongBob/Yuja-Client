import React, { useCallback, useEffect, useRef, useState } from "react";
import './ChatFrame.scss'
import SmallChat from '../Chat/SmallChat';

const ChatFrame = () => {


  return (
    <React.Fragment>
      <div className='chatFrameFrag'>
        <div className='chatFrameOverlay'>
          <SmallChat/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatFrame;