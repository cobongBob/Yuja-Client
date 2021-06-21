import React, { useRef } from 'react';
import './Chat.scss';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatLog from './ChatLog';
import { FaUserAstronaut } from 'react-icons/fa';

const ChatRoom = ({
  receiver,
  totalMsg,
  sender,
  setChatList,
  send,
  inputHandle,
  input,
  backToChatNode,
}) => {
  const inputRef = useRef();
  return (
    <>
      <div className='whoBox'>
        <div className='ChatWho'>
          {receiver.profilePic ? (
            <img
              className='ChatWhoImg'
              src={`https://api.withyuja.com/files/profiles/${receiver.profilePic}`}
              alt=''
            />
          ) : (
            <FaUserAstronaut className='ChatWhoImg' />
          )}
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
          <button className='MessageButtonL' type='button' onClick={() => backToChatNode(receiver)}>
            ◀
          </button>
          <input
            ref={inputRef}
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
              if (e.key === 'Enter' && input.msg !== '') {
                send(receiver);
              }
            }}
            autoFocus
          />
          <button
            className='MessageButtonR'
            type='button'
            onClick={() => {
              input.msg !== '' && send(receiver);
              inputRef?.current.focus();
            }}>
            💬
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
