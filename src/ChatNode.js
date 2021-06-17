import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatRoom from './ChatRoom';

let socket;
const ChatNode = () => {
    const { userData } = useSelector(state => state.loginReducer)
    //로비에서의 유저 리스트
    const [userList, setUserList] = useState([])
    //메세지 받는사람
    const [receiver, setReceiver] = useState("");
    //총 메세지
    const [totalmsg, setTotalMsg] = useState([])
    //쓰고있는 글
    const [input, setInput] = useState({ msg: "" });
    const inputHandle = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }, [input])

    //소켓 연결
    useEffect(() => {
        socket = io('localhost:5000');
        socket.emit("entered", userData)

    }, [userData]);

    //소켓 로비리스트 가져오기
    useEffect(() => {
        socket.on("enteredSucc", (lobby) => {
            setUserList(lobby && lobby.lobby);
        })
    }, []);

    //채팅 상대 결정
    const openChatRoom = useCallback((nickname) => {
        setReceiver(nickname);
        setTotalMsg([]);
    }, [])

    //받는사람 화면 msg조정
    useEffect(() => {
        socket.on("chatReceive", (data) => {
            setTotalMsg(totalmsg.concat(data.msg))
        })
    }, [totalmsg])

    //보내기 및 보내는사람 화면의 msg조정    
    const send = useCallback((e) => {
        e.preventDefault();
        socket.emit("chat msg", input, userData.nickname, receiver);
        setTotalMsg(totalmsg.concat(input.msg));
        setInput({ msg: "" })
    }, [input, receiver, totalmsg, userData])


    return userList && (
        <>
            <div className="ccccc">
                <div id="chatList">
                    {userList.map((data, idx) => {

                        return data !== userData.nickname && (<li key={idx}>
                            <span onClick={() => openChatRoom(data)}>{data}</span>
                        </li>
                        )
                    })}
                </div>
                <div>
                    <input value={input.msg} name="msg" onChange={inputHandle} />
                    <button onClick={send}>보내기</button>
                </div>

                {receiver && socket ?
                    (<div className="">
                        <ChatRoom nickname={receiver} totalmsg={totalmsg} />
                    </div>
                    ) : null}
            </div>
        </>
    );
};

export default ChatNode;