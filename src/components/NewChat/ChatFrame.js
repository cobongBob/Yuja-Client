import React, { useCallback } from "react";
import "./ChatFrame.scss";
import SmallChat from "./SmallChat";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification } from "../../redux/loading/notiReducer";

const ChatFrame = ({ userData, setModalIsOpen, modalIsOpen }) => {
  const { userLoginStatus } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  window.addEventListener("message", (event) => {
    if (event.origin.startsWith("https://api.withyuja.com")) {
      if (event.data && event.data.exit === "exit") {
        setModalIsOpen(false);
      }
    } else if (event.data && event.data.notiId > 0) {
      dispatch(deleteNotification(event.data.notiId));
    } else {
      return;
    }
  });

  const frameOnload = useCallback((e) => {
    e.target.contentWindow.postMessage({ enter: "enter" }, "*");
  }, []);

  if (modalIsOpen === true && userLoginStatus === true) {
    return (
      <React.Fragment>
        <div className='chatFrameFrag'>
          <div className='chatFrameOverlay'>
            <SmallChat frameOnload={frameOnload} setModalIsOpen={setModalIsOpen} />
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default ChatFrame;
