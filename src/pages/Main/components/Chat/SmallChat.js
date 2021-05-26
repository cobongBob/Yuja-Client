import React from "react";
import { useSelector } from "react-redux";
import "./SmallChat.scss";

const SmallChat = () => {
  const { userData } = useSelector((state) => state.loginReducer);

  return (
    <div className='small_chat_body'>
      <div className='small_chat_frame_wrapper'>
        <div className='small_chat_frame'>
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

export default SmallChat;
