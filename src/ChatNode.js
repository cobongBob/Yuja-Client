import React from 'react';
import ChatRoom from './ChatRoom';
import './Chat.scss';

const ChatNode = ({
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
  backToChatNode,
}) => {
  return (
    <>
      <div className='chatRoomFrag'>
        <div className='ChatRoomsWrapper'>
          {chatList === false ? (
            <>
              <div className='ChatListTitle'>
                <h3>유자톡</h3>
              </div>
              <div id='ErrorMsg'></div>
              <div className='ChatForm'>
                <input
                  className='ChatSearch'
                  type='text'
                  id='receiver'
                  name='receiver'
                  placeholder='상대방 닉네임을 입력하세요'
                  maxLength='20'
                  autoComplete='off'
                  autoFocus
                />
                <input className='ChatSubmit' id='ChatSubmitIcon' type='submit' value='🔍' />
              </div>
              <div className='RoomWrapper' id='chatList'>
                {userList?.map((data, idx) => {
                  return (
                    data.name !== userData.nickname && (
                      <div className='userList' key={idx}>
                        <div className='chatUser'>
                          <div className='ChatImg'>
                            <img
                              src={`http://localhost:8888/files/profiles/${data.profilePic}`}
                              alt=''
                            />
                          </div>
                          <div className='chatUserName' onClick={() => openChatRoom(data)}>
                            {data.name}
                            <div className='newChatNotice' id='enterRoom'>
                              📧
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </>
          ) : (
            <ChatRoom
              receiver={receiver}
              totalMsg={totalMsg}
              setChatList={setChatList}
              sender={userData.nickname}
              input={input}
              send={send}
              inputHandle={inputHandle}
              backToChatNode={backToChatNode}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatNode;
