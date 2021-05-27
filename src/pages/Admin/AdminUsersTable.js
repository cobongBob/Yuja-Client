import React, { useCallback, useMemo, useState } from "react";
import "./AdminUser.scss";
import Modal from "react-modal";
import { ToastCenter } from "../../modules/ToastModule";
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
              <th className='user_option'>옵션</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((user, idx) => (
                <tr key={idx} onClick={() => openModal(idx)}>
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
                    <span onClick={() => userSetBan(user.id, user.username, user.banned)} className='option_ban'>
                      {!user.banned ? (
                        <span style={{ color: "red" }}>밴 하기</span>
                      ) : (
                        <span style={{ color: "blue" }}>밴 해제</span>
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
              <table>
                <thead>
                  <tr>
                    <th className='user_no'>번호</th>
                    <th className='user_id'>아이디</th>
                    <th className='user_nickname'>닉네임</th>
                    <th className='user_regDate'>가입일</th>
                    <th className='user_authority'>권한</th>
                    <th className='user_option'>옵션</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{currentData[seleted].id}</td>
                    <td>{currentData[seleted].username}</td>
                    <td>{currentData[seleted].nickname}</td>
                    <td>{currentData[seleted].createDate}</td>
                    <td>
                      {currentData[seleted].authorities.map((auth, idx) => {
                        if (idx === currentData[seleted].authorities.length - 1) {
                          return auth.authority;
                        } else {
                          return auth.authority + ", ";
                        }
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() =>
                  userSetBan(currentData[seleted].id, currentData[seleted].username, currentData[seleted].banned)
                }
                className='btn btn-warning'
              >
                {!currentData[seleted].banned ? (
                  <span style={{ color: "red" }}>밴 하기</span>
                ) : (
                  <span style={{ color: "blue" }}>밴 해제</span>
                )}
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

export default AdminUsersTable;
