import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import ChatFrame from './ChatFrame';
import { getFormatTime } from '../../modules/getFormatTime';
import { ToastAlert } from '../../modules/ToastModule';
import { addChatNotification, deleteNotification } from '../../redux/loading/notiReducer';

const ChatWrapper = ({ modalIsOpen, userData }) => {
  const dispatch = useDispatch();
  const socket = useRef();
  //로비에서의 유저 리스트
  const [userList, setUserList] = useState([]);
  //메세지 받는사람
  const [receiver, setReceiver] = useState({});
  //총 메세지
  const [totalMsg, setTotalMsg] = useState([]);
  //쓰고있는 글
  const [input, setInput] = useState({ msg: '' });
  //챗룸 들어갔냐
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
      socket.current = io('nodechat.withyuja.com');
      socket.current?.emit('entered', userData);
    }
  }, [userData]);

  //소켓 로비리스트 가져오기
  useEffect(() => {
    socket.current?.on('enteredSucc', (lobby) => {
      setUserList(lobby);
    });
    return () => {
      socket.current?.off('enteredSucc');
    };
  }, [userData]);

  useEffect(() => {
    socket.current?.on('newConn', (data) => {
      setUserList(userList.concat(data));
    });
    return () => {
      socket.current?.off('newConn');
    };
  }, [userList, userData]);

  //disconnect event => remove the personal's info
  useEffect(() => {
    socket.current?.on('disConn', (data) => {
      setUserList(userList.filter((user) => user.name !== data.disConnName));
    });
    return () => {
      socket.current?.off('disConn');
    };
  }, [userList, userData]);

  //로그아웃 처리
  useEffect(() => {
    if (!userData || userData.id === 0) {
      socket.current?.emit('logout', userData, receiver.name);
      setInput({ msg: '' });
      setChatList(false);
    }
  }, [userData, receiver]);

  //채팅 상대 결정
  const openChatRoom = useCallback(
    (data) => {
      setReceiver(data);
      socket.current?.emit(
        'chat msg',
        `${userData.nickname}님이 입장하셨습니다.`,
        userData.nickname,
        data.name
      );
      socket.current?.emit('chatNoti', userData, data.name);
      socket.current?.emit('handshaker', userData, data);
      dispatch(deleteNotification(data.name));
      setTotalMsg([]);
      setChatList(true);
    },
    [userData, dispatch]
  );

  //받는사람에게 채팅 알림
  useEffect(() => {
    if (userData && userData.id > 0) {
      socket.current?.on('chatNotification', ({ msg, sender }) => {
        if (receiver.name !== sender.nickname) {
          ToastAlert(msg);
          dispatch(
            addChatNotification({
              notiId: sender.nickname,
              sender: sender,
              resipeint: userData,
              comment: null,
              type: 'chatNoti',
              readDate: '',
            })
          );
        }
      });
      return () => {
        socket.current?.off('chatNotification');
      };
    }
  }, [userData, receiver, dispatch]);

  //받는사람 화면 msg조정
  useEffect(() => {
    socket.current?.on('chatReceive', (data) => {
      setTotalMsg(totalMsg.concat({ ...data, time: getFormatTime(new Date()) }));
    });
    return () => {
      socket.current?.off('chatReceive');
    };
  }, [totalMsg, userData]);

  //보내기 및 보내는사람 화면의 msg조정
  const send = useCallback(
    (receiver) => {
      socket.current?.emit('chat msg', input.msg, userData.nickname, receiver.name);
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

  //방 나가기
  const backToChatNode = useCallback(
    (receiver) => {
      socket.current?.emit('quit', userData, receiver.name);
      setChatList(false);
      setReceiver({});
    },
    [setChatList, userData]
  );

  return (
    <>
      {modalIsOpen === true && userData.id > 0 ? (
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
          backToChatNode={backToChatNode}
        />
      ) : null}
    </>
  );
};

export default ChatWrapper;
