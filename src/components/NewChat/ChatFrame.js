import React, { useCallback } from "react";
import "./ChatFrame.scss";
import SmallChat from "./SmallChat";
import { useSelector } from "react-redux";
import ChatNode from '../../ChatNode';

const ChatFrame = (props) => {
  window.addEventListener("message", (event) => {
    if (event.origin.startsWith("http://localhost:8888")) {
      if (event.data && event.data.exit === "exit") {
        props.setModalIsOpen(false);
      }
    } else {
      return;
    }
  });

  const frameOnload = useCallback((e) => {
    e.target.contentWindow.postMessage({ enter: "enter" }, "*");
  }, []);

  const { userLoginStatus } = useSelector((state) => state.loginReducer);

  if (props.modalIsOpen === true && userLoginStatus === true) {
    return (
      <React.Fragment>
        <div className='chatFrameFrag'>
          <div className='chatFrameOverlay'>
            <ChatNode/>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default ChatFrame;
