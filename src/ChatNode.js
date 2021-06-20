import React, { useCallback, useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';
import './Chat.scss';
import { FaUserAstronaut } from 'react-icons/fa';

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
  const [resultList, setResultList] = useState([
    { name: '유저1', profilePic: '' },
    { name: '유저2', profilePic: '' },
    { name: '유저3', profilePic: '' },
    { name: '유저4', profilePic: '' },
    { name: '유저5', profilePic: '' },
    { name: '유저6', profilePic: '' },
    { name: '유저7', profilePic: '' },
    { name: '유저8', profilePic: '' },
    { name: '유저9', profilePic: '' },
    { name: '유저10', profilePic: '' },
    { name: '유저11', profilePic: '' },
    { name: '유저12', profilePic: '' },
    { name: '유저13', profilePic: '' },
    { name: '유저14', profilePic: '' },
    { name: '유저15', profilePic: '' },
    { name: '유저16', profilePic: '' },
    { name: '유저17', profilePic: '' },
    { name: '유저18', profilePic: '' },
    { name: '유저19', profilePic: '' },
    { name: '유저20', profilePic: '' },
  ]);

  const [keyword, setKeyword] = useState('');
  const keywordHandler = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  // useEffect(() => {
  //   setResultList(
  //     userList.filter((user) => {
  //       return user.name.toLowerCase().includes(keyword.toLowerCase());
  //     })
  //   );
  // }, [userList, keyword]);

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
                  placeholder='상대방 닉네임을 입력하세요'
                  maxLength='20'
                  autoComplete='off'
                  autoFocus
                  onChange={keywordHandler}
                  value={keyword}
                />
                <input
                  className='ChatSubmit'
                  id='ChatSubmitIcon'
                  type='button'
                  value='🔍'
                />
              </div>
              <div className='RoomWrapper' id='chatList'>
                {resultList?.map((data, idx) => {
                  return (
                    data.name !== userData.nickname && (
                      <div className='userList' key={idx}>
                        <div className='chatUser'>
                          <div className='ChatImg'>
                            {data.profilePic ? (
                              <img
                                src={`http://localhost:8888/files/profiles/${data.profilePic}`}
                                alt=''
                              />
                            ) : (
                              <FaUserAstronaut size={45} />
                            )}
                          </div>
                          <div
                            className='chatUserName'
                            onClick={() => openChatRoom(data)}
                          >
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
