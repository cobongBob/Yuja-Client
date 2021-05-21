import React, { useMemo } from "react";
import Modal from "react-modal";
import "./ChatModal.scss";
import SmallChat from "./SmallChat";

Modal.setAppElement("#root");
const ChatModal = ({ modalIsOpen, setModalIsOpen, setUseChat }) => {
  function closeModal() {
    setModalIsOpen(false);
  }
  const reportcustomStyles = useMemo(
    () => ({
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: "#edfcfc",
        height: "100%",
        width: "50%",
      },
      overlay: { zIndex: 100 },
    }),
    []
  );
  return (
    <div>
      <span className='chat_close' onClick={closeModal}>
        &times;
      </span>
      <Modal isOpen={modalIsOpen} style={reportcustomStyles} onRequestClose={closeModal}>
        <SmallChat />
      </Modal>
    </div>
  );
};

export default ChatModal;
