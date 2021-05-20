import React from "react";
import "./AdminUser.scss";

const AdminUsersTable = ({ currentData, lastIdx, currentPage }) => {
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
                <tr key={idx}>
                  <td>{user.id}.</td>
                  <td>{user.username}</td>
                  <td>{user.nickname}</td>
                  <td>{user.createDate.substr(0, 10)}</td>
                  <td>
                    {user.authorities.map((auth) => {
                      return auth.authority;
                    })}
                  </td>
                  <td>강제 탈퇴</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersTable;