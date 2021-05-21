import React from "react";
import { useSelector } from "react-redux";
import "./SmallChat.scss";

const SmallChat = () => {
  const { userData } = useSelector((state) => state.loginReducer);

  return userData.id ? (
    <div className='small_chat_body'>
      <div className='small_chat_frame_wrapper'>
        <div className='small_chat_frame'>
          <iframe className='chattingFrame' src='http://localhost:8888/rooms' title='YujaChat'></iframe>
        </div>
      </div>
    </div>
  ) : (
    <h1>로그인해주세요</h1>
  );
};

export default SmallChat;
