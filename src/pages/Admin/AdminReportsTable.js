import React, { useCallback, useState } from "react";
import Modal from "react-modal";
const AdminReportsTable = ({ currentData, lastIdx, currentPage }) => {
  const reportcustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#edfcfc",
      width: "55%",
    },
    overlay: { zIndex: 9999 },
  };
  const [modalIsOpen, setModalIsOpen] = useState();
  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);
  return (
    <div>
      <div className='community-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th className='user_no'>번호</th>
              <th className='report_title'>제목</th>
              <th className='report_user'>신고한 유저</th>
              <th className='report_content'>신고 사유</th>
              <th className='user_regDate'>신고 날짜</th>
              <th className='user_option'>상태</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((report, idx) => (
                <>
                  <tr key={idx} onClick={openModal} className='admin_report_detail'>
                    <td>{lastIdx - idx}</td>
                    <td>{report.title}</td>
                    <td>{report.user.username}</td>
                    <td>{report.content}</td>
                    <td>{report.createDate.substr(0, 10)}</td>
                    <td>처리 중</td>
                  </tr>
                  <Modal isOpen={modalIsOpen} style={reportcustomStyles} onRequestClose={closeModal}>
                    <div className='admin_report_modal'>
                      <div>신고자 : {report.user.username}</div>
                      <div>신고날짜 : {report.createDate.substr(0, 10)}</div>
                      <div>신고내용 : {report.content}</div>
                      <button
                        className='YCBtn'
                        onClick={() => {
                          closeModal();
                        }}
                      >
                        해당 게시글로 이동
                      </button>
                      <button
                        className='YCBtn'
                        onClick={() => {
                          closeModal();
                        }}
                      >
                        해당 게시글 삭제
                      </button>
                      <button className='YCBtn' onClick={closeModal}>
                        닫기
                      </button>
                    </div>
                  </Modal>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportsTable;
