import React, { useCallback, useMemo, useState } from "react";
import Modal from "react-modal";
import { ToastCenter } from "../../modules/ToastModule";
Modal.setAppElement("#root");
const AdminYoutuberTable = ({ currentData, promoteUser, rejectUser }) => {
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
        width: "70%",
      },
      overlay: { zIndex: 9999 },
    }),
    []
  );
  const [modalIsOpen, setModalIsOpen] = useState();
  const [seleted, setSeleted] = useState(0);
  const openModal = useCallback((idx) => {
    setModalIsOpen(true);
    setSeleted(idx);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);
  return (
    <div>
      <div className='admin-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th className='user_no'>번호</th>
              <th className='user_id'>아이디</th>
              <th className='user_nickname'>닉네임</th>
              <th className='user_authority'>인증사진</th>
              <th className='user_regDate'>신청일</th>
              <th className='user_option'>상태</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((youtuber, idx) => (
                <tr key={idx} onClick={() => openModal(idx)}>
                  <td>{youtuber.youtubeConfirmId}</td>
                  <td>{youtuber.user.username}</td>
                  <td>{youtuber.user.nickname}</td>
                  <td className='img_wrapper'>
                    <img
                      src={`http://localhost:8888/files/youtubeConfirm/${youtuber.youtubeConfirmImg}`}
                      alt='컨펌이미지'
                      className='Admin_confirm_small'
                    ></img>
                  </td>

                  <td>{youtuber.createdDate.substr(0, 10)}</td>
                  <td>처리중</td>
                </tr>
              ))}
          </tbody>
        </table>
        {currentData && currentData.length > 0 && (
          <Modal closeTimeoutMS={200} isOpen={modalIsOpen} style={reportcustomStyles} onRequestClose={closeModal}>
            <div>
              <img
                src={`http://localhost:8888/files/youtubeConfirm/${currentData[seleted].youtubeConfirmImg}`}
                alt='컨펌이미지'
                className='Admin_confirm_big'
              ></img>
            </div>
            <div className='admin_modal_btn'>
              <button
                className='YCBtn'
                onClick={() => {
                  promoteUser(
                    currentData[seleted].youtubeConfirmId,
                    currentData[seleted].user.bsn,
                    currentData[seleted].user.youtubeUrl,
                    currentData[seleted].user.id
                  );
                  closeModal();
                  ToastCenter("인증 되었습니다.");
                }}
              >
                인증 처리
              </button>
              <button
                className='YCBtn'
                onClick={() => {
                  rejectUser(currentData[seleted].youtubeConfirmId);
                  closeModal();
                  ToastCenter("인증이 거절되었습니다.");
                }}
              >
                인증 거절
              </button>
              <button className='YCBtn' onClick={closeModal}>
                닫기
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AdminYoutuberTable;
