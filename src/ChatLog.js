import React, { useEffect, useRef } from 'react';
import useScrollToBottom from 'react-scroll-to-bottom/lib/hooks/useScrollToBottom';
import useSticky from 'react-scroll-to-bottom/lib/hooks/useSticky';

const ChatLog = ({ sender, totalMsg, receiver }) => {
  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
  const lastRef = useRef();
  useEffect(() => {
    lastRef.current && lastRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [totalMsg]);
  return (
    <div id='chatLog'>
      {totalMsg?.map((data, index) =>
        data.sender !== sender ? (
          <>
            <div className='ChatReceiverBigWrapper' ref={lastRef}>
              <div className='ChatReceiverWrapper'>
                <div className='ReceiverImgWrapper'>
                  <img className='ChatReceiverProfileImg' src='' alt='' />
                </div>
                <div className='ChatMessageReceiver'>{receiver.name}</div>
                <div className='ReceiverChatMessageContent'>
                  <p className='ChatContent'>{data.msg}</p>
                  <span className='ReceiverChatDate'>{data.time}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='ChatSenderBigWrapper' ref={lastRef}>
              <div className='ChatSenderWrapper'>
                <div className='SenderChatMessageContent'>
                  <p className='ChatContent'>{data.msg}</p>
                  <span className='SenderChatDate'>{data.time}</span>
                </div>
              </div>
            </div>
          </>
        )
      )}
      {!sticky && <button onClick={scrollToBottom}>Click me to scroll to bottom</button>}
    </div>
  );
};

export default ChatLog;
