import React from "react";
import { useSelector } from "react-redux";
import "./Chat.scss";
import { AiFillWechat } from "react-icons/ai";

const Chat = () => {
  const { userData } = useSelector((state) => state.loginReducer);

  return userData.id ? (
    <div className='chat_body'>
      <div className='ChatIconsWrapper'>
        <h1>
          <AiFillWechat className='ChatIcons'></AiFillWechat>유자톡
        </h1>
      </div>
      <div className='chat_frame_wrapper'>
        <div className='chat_frame'>
          <iframe className='chattingFrame' src='http://localhost:8888/rooms' title='YujaChat'></iframe>
        </div>
      </div>
    </div>
  ) : (
    <h1>로그인해주세요</h1>
  );
};

export default Chat;
