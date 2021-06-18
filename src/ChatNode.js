import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatRoom from './ChatRoom';
import "./Chat.scss"
import { getFormatTime } from './modules/getFormatTime';


const ChatNode = () => {

    const socket = useRef();
    const { userData } = useSelector(state => state.loginReducer)
    //로비에서의 유저 리스트
    const [userList, setUserList] = useState([])
    //메세지 받는사람
    const [receiver, setReceiver] = useState({});
    //총 메세지
    const [totalMsg, setTotalMsg] = useState([])
    //쓰고있는 글
    const [input, setInput] = useState({ msg: "" });
    const [chatList, setChatList] = useState(false);

    const inputHandle = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }, [input])

    //소켓 연결
    useEffect(() => {
        if (userData && userData.id > 0) {
            socket.current = io('localhost:5000');
            socket.current.emit("entered", userData)
        }

    }, [userData]);

    //소켓 로비리스트 가져오기
    useEffect(() => {
        socket.current &&
        socket.current.on("enteredSucc", (lobby) => {
            setUserList(lobby);
        })
    }, []);

    useEffect(() => {
        socket.current &&
        socket.current.on("newConn", (data) => {
            setUserList(userList.concat(data))
        })
    }, [userList]);

    //disconnect event => remove the personal's info
    useEffect(() => {
        socket.current &&
        socket.current.on("disConn", (data) => {
            setUserList(userList.filter((data) => data.name !== data.disConnName))
        })
    }, [userList]);

    //채팅 상대 결정
    const openChatRoom = useCallback((data) => {
        setReceiver(data);
        socket.current &&
        socket.current.emit("chat msg", `${userData.nickname}님이 입장하셨습니다.`, userData.nickname, data.name);
        setTotalMsg([]);
        setChatList(true)
    }, [userData.nickname])

    //받는사람 화면 msg조정
    useEffect(() => {
        socket.current &&
        socket.current.on("chatReceive", (data) => {
            setTotalMsg(totalMsg.concat(data));
        })
    }, [totalMsg])

    //보내기 및 보내는사람 화면의 msg조정
    const send = useCallback((receiver) => {
        socket.current &&
        socket.current.emit("chat msg", input.msg, userData.nickname, receiver.name);
        setTotalMsg(totalMsg.concat({sender:userData.nickname,msg:input.msg, time:getFormatTime(new Date()) }));
        setInput({ msg: "" })
    }, [input, receiver, totalMsg, userData])

    return userList && (
        <>
            <div className='chatRoomFrag'>
                <div className="ChatRoomsWrapper">
                    {chatList === false ? (
                      <>
                      <div className="ChatListTitle">
                          <h3>유자톡</h3>
                      </div>
                      <div id="ErrorMsg"></div>
                        <div className="ChatForm">
                            <form onSubmit="return findRoom()">
                                <input
                                className="ChatSearch"
                                type="text"
                                id="receiver"
                                name="receiver"
                                placeholder="상대방 닉네임을 입력하세요"
                                maxLength="20"
                                autoComplete="off"
                                />
                                <input
                                className="ChatSubmit"
                                id="ChatSubmitIcon"
                                type="submit"
                                value="🔍"
                                onClick="return findRoom()"
                                />
                            </form>
                        </div>
                          <div className='RoomWrapper' id='chatList'>
                            {userList?.map((data, idx) => {
                                return data.name !== userData.nickname && (
                                  <div className='userList' key={idx}>
                                      <div className='chatUser'>
                                          <div className='ChatImg'>
                                              <img src={`http://localhost:8888/files/profiles/${data.profilePic}`} alt=""/>
                                          </div>
                                          <div
                                            className='chatUserName'
                                            onClick={
                                                () => openChatRoom(data)
                                            }
                                          >
                                              {data.name}
                                              <div className='newChatNotice'
                                                   id="enterRoom"
                                                   onClick=''
                                              >
                                                  📧
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                )
                            })}
                          </div>
                      </>
                        )
                      :
                        (
                        <ChatRoom
                          receiver={receiver}
                          totalMsg={totalMsg}
                          setChatList={setChatList}
                          sender={userData.nickname}
                          input={input}
                          send={send}
                          inputHandle={inputHandle}
                        />
                        )}
                </div>
            </div>
        </>
    );
};

export default ChatNode;