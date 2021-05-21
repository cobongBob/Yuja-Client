import React, { useCallback, useMemo, useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router";
import { BoardTypeConvertUrl } from "../../modules/BoardTypeConvert";

const AdminReportsTable = ({ currentData, lastIdx, currentPage, deleteReported }) => {
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
        width: "55%",
      },
      overlay: { zIndex: 9999 },
    }),
    []
  );

  const [modalIsOpen, setModalIsOpen] = useState();
  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);
  const history = useHistory();
  const moveToBoard = useCallback(
    (title) => {
      const idx = title.indexOf("##");
      const reportedBoardCode = Number(title.substr(0, idx).trim());
      const reportedBoardId = Number(title.substr(idx + 2).trim());
      const boardUrl = BoardTypeConvertUrl(reportedBoardCode, reportedBoardId);
      history.push(boardUrl);
    },
    [history]
  );
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
                    <td>처리중...</td>
                  </tr>
                  <Modal isOpen={modalIsOpen} style={reportcustomStyles} onRequestClose={closeModal}>
                    <div className='admin_report_modal'>
                      <div className='admin_report_modal_user'>
                        <span style={{ fontWeight: "bold" }}>신고자</span> : {report.user.username}
                      </div>
                      <div className='admin_report_modal_date'>
                        <span style={{ fontWeight: "bold" }}>신고날짜</span> : {report.createDate.substr(0, 10)}
                      </div>
                      <div className='admin_report_modal_content'>
                        <span style={{ fontWeight: "bold" }}>신고내용</span> : {report.content}
                      </div>
                      <div className='admin_modal_btn'>
                        {" "}
                        <button
                          className='YCBtn'
                          onClick={() => {
                            moveToBoard(report.title);
                            closeModal();
                          }}
                        >
                          해당 게시글로 이동
                        </button>
                        <button
                          className='YCBtn'
                          onClick={() => {
                            deleteReported(report.title, report.id);
                            closeModal();
                          }}
                        >
                          해당 게시글 삭제
                        </button>
                        <button className='YCBtn' onClick={closeModal}>
                          닫기
                        </button>
                      </div>
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
