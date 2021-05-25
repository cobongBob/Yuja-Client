import React, { useMemo } from "react";
import Modal from "react-modal";
import "./ChatModal.scss";
import SmallChat from "./SmallChat";

Modal.setAppElement("#root");
const ChatModal = ({ modalIsOpen, setModalIsOpen, setUseChat }) => {

  function closeModal() {
    setModalIsOpen(false);
  }
  const chatModalCustomStyles = useMemo(
    () => ({
      content: {
        top: "57%",
        left: "82%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        height: "50%",
        width: "30%",
        zIndex: 9999,
      },
    }),
    []
  );
  return (
    <React.Fragment>
      <div className='chatModalFrag'>
        <span className='chat_close' onClick={closeModal}>
          &times;
        </span>
        <div className='chatModalOverlay'>
          <Modal
            closeTimeoutMS={200}
            isOpen={modalIsOpen}
            style={chatModalCustomStyles}
            onRequestClose={closeModal}
            shouldCloseOnEsc={true}
          >
            <SmallChat />
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatModal;
