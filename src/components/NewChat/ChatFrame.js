import React from 'react';
import './ChatFrame.scss';
import ChatNode from '../../ChatNode';

const ChatFrame = ({
  chatList,
  userList,
  userData,
  openChatRoom,
  receiver,
  totalMsg,
  setChatList,
  input,
  send,
  inputHandle,
}) => {
  return (
    <React.Fragment>
      <div className='chatFrameFrag'>
        <div className='chatFrameOverlay'>
          <ChatNode
            chatList={chatList}
            userList={userList}
            userData={userData}
            openChatRoom={openChatRoom}
            receiver={receiver}
            totalMsg={totalMsg}
            setChatList={setChatList}
            input={input}
            send={send}
            inputHandle={inputHandle}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default ChatFrame;
