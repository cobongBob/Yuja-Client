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
        width: "60%",
        height: "80%",
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
                      src={`https://api.withyuja.com/files/youtubeConfirm/${youtuber.youtubeConfirmImg}`}
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
        {currentData && currentData.length > 0 && currentData[seleted] && (
          <Modal closeTimeoutMS={200} isOpen={modalIsOpen} style={reportcustomStyles} onRequestClose={closeModal}>
            <div>
              <h3>사업자 번호 : {currentData[seleted].bsn}</h3>
              <img
                src={`https://api.withyuja.com/files/youtubeConfirm/${currentData[seleted].youtubeConfirmImg}`}
                alt='컨펌이미지'
                className='Admin_confirm_big'
              ></img>
            </div>
            <div className='admin_modal_btn'>
              <button
                className='btn btn-warning'
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
                className='btn btn-warning'
                onClick={() => {
                  rejectUser(currentData[seleted].youtubeConfirmId);
                  closeModal();
                  ToastCenter("인증이 거절되었습니다.");
                }}
              >
                인증 거절
              </button>
              <button className='btn btn-warning' onClick={closeModal}>
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
