import React, { useCallback, useMemo, useState } from "react";
import "./AdminUser.scss";
import Modal from "react-modal";
Modal.setAppElement("#root");
const AdminUsersTable = ({ currentData, userSetBan }) => {
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
      <div className='community-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th className='user_no'>번호</th>
              <th className='user_id'>아이디</th>
              <th className='user_nickname'>닉네임</th>
              <th className='user_regDate'>가입일</th>
              <th className='user_authority'>권한</th>
              <th className='user_option'>상태</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((user, idx) => (
                <tr key={idx} className='user_table_tr' onClick={() => openModal(idx)}>
                  <td>{user.id}.</td>
                  <td>{user.username}</td>
                  <td>{user.nickname}</td>
                  <td>{user.createDate.substr(0, 10)}</td>
                  <td>
                    {user.authorities.map((auth, idx) => {
                      if (idx === user.authorities.length - 1) {
                        return auth.authority;
                      } else {
                        return auth.authority + ", ";
                      }
                    })}
                  </td>
                  <td>
                    <span>
                      {!user.banned ? (
                        <span style={{ color: "blue" }}>활동중</span>
                      ) : (
                        <span style={{ color: "red" }}>정지됨</span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {currentData && currentData.length > 0 && currentData[seleted] && (
          <Modal closeTimeoutMS={200} isOpen={modalIsOpen} style={reportcustomStyles} onRequestClose={closeModal}>
            <div>
              <div>
                <table className='editordetail-wrapper admin_user_details'>
                  <tr className='editordetail-header-wrapper'>
                    <td className='editordetail-header'>회원정보</td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>번호 </th>
                    <td> {currentData[seleted].id}</td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>아이디 </th>
                    <td> {currentData[seleted].username}</td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>활동명 </th>
                    <td> {currentData[seleted].nickname}</td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>가입일 </th>
                    <td> {currentData[seleted].createDate.substr(0, 10)}</td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>권한 </th>
                    <td>
                      {" "}
                      {currentData[seleted].authorities.map((auth, idx) => {
                        if (idx === currentData[seleted].authorities.length - 1) {
                          return auth.authority;
                        } else {
                          return auth.authority + ", ";
                        }
                      })}
                    </td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>주소 </th>
                    <td> {currentData[seleted].address}</td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>생년월일 </th>
                    <td> {currentData[seleted].bday}</td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>상세주소 </th>
                    <td> {currentData[seleted].detailAddress}</td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>연락처 </th>
                    <td> {currentData[seleted].phone}</td>
                  </tr>
                  <tr>
                    <th className='admin_user_detail'>유튜브 주소 </th>
                    <td> {currentData[seleted].youtubeUrl}</td>
                  </tr>
                </table>
              </div>
              <br />
              <div className='admin_modal_btn'>
                <button
                  onClick={() => {
                    userSetBan(currentData[seleted].id, currentData[seleted].username, currentData[seleted].banned);
                    closeModal();
                  }}
                  className='YCBtn'
                >
                  {!currentData[seleted].banned ? (
                    <span style={{ color: "red" }}>밴 하기</span>
                  ) : (
                    <span style={{ color: "blue" }}>밴 해제</span>
                  )}
                </button>
                <button className='YCBtn' onClick={closeModal}>
                  닫기
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AdminUsersTable;
