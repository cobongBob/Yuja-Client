import React from 'react';

const ChatRoom = ({ nickname, totalmsg }) => {

  return (
    <>
      <div className="ccccc">
        <h2>{nickname}</h2>
        <ul>
          {
            totalmsg.map((data, idx) =>
              <li key={idx}>{data}</li>
            )}
        </ul>


      </div>
    </>
  );
};

export default ChatRoom;