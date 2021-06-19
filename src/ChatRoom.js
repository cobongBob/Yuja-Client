import React, { useCallback } from 'react';
import './Chat.scss';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatLog from './ChatLog';

const ChatRoom = ({ receiver, totalMsg, sender, setChatList, send, inputHandle, input }) => {
  const backToChatNode = useCallback(() => {
    setChatList(false);
  }, [setChatList]);

  return (
    <>
      <div className='whoBox'>
        <div className='ChatWho'>
          <img
            className='ChatWhoImg'
            src={`http://localhost:8888/files/profiles/${receiver.profilePic}`}
            alt=''
          />
        </div>
        <div className='chatWhoName'>{receiver.name}</div>
      </div>

      <div id='ChatLogsWrapper'>
        <ScrollToBottom>
          <ChatLog sender={sender} totalMsg={totalMsg} receiver={receiver} />
        </ScrollToBottom>
      </div>
      <div className='MessageInputWrapper'>
        <div className='submitBox'>
          <button className='MessageButtonL' type='button' onClick={backToChatNode}>
            ◀
          </button>
          <input
            className='MessageInput'
            type='text'
            id='message'
            name='msg'
            placeholder='메세지를 적어주세요'
            autoComplete='off'
            value={input.msg}
            maxLength='2000'
            onChange={inputHandle}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                send(receiver);
              }
            }}
            autoFocus
          />
          <button className='MessageButtonR' type='button' onClick={() => send(receiver)}>
            💬
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
