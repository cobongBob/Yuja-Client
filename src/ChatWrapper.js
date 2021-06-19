import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import ChatFrame from './components/NewChat/ChatFrame';
import { getFormatTime } from './modules/getFormatTime';

const ChatWrapper = ({ modalIsOpen, userData }) => {
  const socket = useRef();
  //로비에서의 유저 리스트
  const [userList, setUserList] = useState([]);
  //메세지 받는사람
  const [receiver, setReceiver] = useState({});
  //총 메세지
  const [totalMsg, setTotalMsg] = useState([]);
  //쓰고있는 글
  const [input, setInput] = useState({ msg: '' });
  const [chatList, setChatList] = useState(false);

  const inputHandle = useCallback(
    (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    },
    [input]
  );

  //소켓 연결
  useEffect(() => {
    if (userData && userData.id > 0) {
      socket.current = io('localhost:5000');
      socket.current.emit('entered', userData);
    }
  }, [userData]);

  //소켓 로비리스트 가져오기
  useEffect(() => {
    socket.current &&
      socket.current.on('enteredSucc', (lobby) => {
        setUserList(lobby);
      });
    return () => {
      socket.current.off('enteredSucc');
    };
  }, []);

  useEffect(() => {
    socket.current &&
      socket.current.on('newConn', (data) => {
        setUserList(userList.concat(data));
      });
    return () => {
      socket.current.off('newConn');
    };
  }, [userList]);

  //disconnect event => remove the personal's info
  useEffect(() => {
    socket.current &&
      socket.current.on('disConn', (data) => {
        setUserList(userList.filter((data) => data.name !== data.disConnName));
      });
    return () => {
      socket.current.off('disConn');
    };
  }, [userList]);

  //채팅 상대 결정
  const openChatRoom = useCallback(
    (data) => {
      setReceiver(data);
      socket.current &&
        socket.current.emit(
          'chat msg',
          `${userData.nickname}님이 입장하셨습니다.`,
          userData.nickname,
          data.name
        );
      setTotalMsg([]);
      setChatList(true);
    },
    [userData.nickname]
  );

  //받는사람 화면 msg조정
  useEffect(() => {
    socket.current &&
      socket.current.on('chatReceive', (data) => {
        setTotalMsg(totalMsg.concat({ ...data, time: getFormatTime(new Date()) }));
      });
    return () => {
      socket.current.off('chatReceive');
    };
  }, [totalMsg]);

  //보내기 및 보내는사람 화면의 msg조정
  const send = useCallback(
    (receiver) => {
      socket.current &&
        socket.current.emit('chat msg', input.msg, userData.nickname, receiver.name);
      setTotalMsg(
        totalMsg.concat({
          sender: userData.nickname,
          msg: input.msg,
          time: getFormatTime(new Date()),
        })
      );
      setInput({ msg: '' });
    },
    [input, totalMsg, userData]
  );

  return (
    <>
      {modalIsOpen === true ? (
        <ChatFrame
          chatList={chatList}
          userList={userList}
          userData={userData}
          openChatRoom={openChatRoom}
          receiver={receiver}
          totalMsg={totalMsg}
          setChatList={setChatList}
          input={input}
          send={send}
          inputHandle={inputHandle}
        />
      ) : null}
    </>
  );
};

export default ChatWrapper;
