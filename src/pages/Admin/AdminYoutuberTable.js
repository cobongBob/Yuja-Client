import React from "react";

const AdminYoutuberTable = ({ currentData, lastIdx, currentPage }) => {
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
            {currentData && currentData.map((youtuber, idx) => <tr key={idx}>{console.log(123, youtuber)}</tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminYoutuberTable;
