import React from "react";
import "./Chat.scss";

const Chat = () => {
  return (
    <div className='chat_body'>
      <div className='chat_frame_wrapper'>
        <div className='chat_frame'>
          <iframe src='http://localhost:8888/rooms' title='YujaChat'></iframe>
        </div>
      </div>
    </div>
  );
};

export default Chat;
