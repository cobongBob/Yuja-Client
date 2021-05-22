import React from "react";
import { useSelector } from "react-redux";
import "./Chat.scss";
import { AiFillWechat } from "react-icons/ai";

const Chat = () => {
  const { userData } = useSelector((state) => state.loginReducer);

  return (
    <div className='chat_body'>
      <div className='ChatIconsWrapper'>
        <h1>
          <AiFillWechat className='ChatIcons'></AiFillWechat>유자톡
        </h1>
      </div>
      <div className='chat_frame_wrapper'>
        <div className='chat_frame'>
          {userData.id ? (
            <iframe className='chattingFrame' src='http://localhost:8888/rooms' title='YujaChat'></iframe>
          ) : (
            <h1>로그인해주세요</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
