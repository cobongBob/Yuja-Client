import React, { useEffect, useRef } from 'react';
import useScrollToBottom from 'react-scroll-to-bottom/lib/hooks/useScrollToBottom';
import useSticky from 'react-scroll-to-bottom/lib/hooks/useSticky';
import { FaUserAstronaut } from 'react-icons/fa';

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
          <React.Fragment key={index}>
            <div className='ChatReceiverBigWrapper' ref={lastRef}>
              <div className='ChatReceiverWrapper'>
                <div className='ReceiverImgWrapper'>
                  {receiver.profilePic ? (
                    <img
                      className='ChatReceiverProfileImg'
                      src={`https://api.withyuja.com/files/profiles/${receiver.profilePic}`}
                      alt=''
                    />
                  ) : (
                    <FaUserAstronaut size={30} className='ChatReceiverProfileImg' />
                  )}
                </div>
                <div className='ChatMessageReceiver'>{receiver.name}</div>
                <div className='ReceiverChatMessageContent'>
                  <p className='ChatContent'>{data.msg}</p>
                  <span className='ReceiverChatDate'>{data.time}</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment key={index}>
            <div className='ChatSenderBigWrapper' ref={lastRef}>
              <div className='ChatSenderWrapper'>
                <div className='SenderChatMessageContent'>
                  <p className='ChatContent'>{data.msg}</p>
                  <span className='SenderChatDate'>{data.time}</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      )}
      {!sticky && <button onClick={scrollToBottom}>Click me to scroll to bottom</button>}
    </div>
  );
};

export default ChatLog;
