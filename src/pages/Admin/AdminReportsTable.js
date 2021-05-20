import React from "react";

const AdminReportsTable = ({ currentData, lastIdx, currentPage }) => {
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
                <tr key={idx}>
                  <td>{lastIdx - idx}</td>
                  <td>{report.title}</td>
                  <td>{report.user.username}</td>
                  <td>{report.content}</td>
                  <td>{report.createDate.substr(0, 10)}</td>
                  <td>처리 중</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportsTable;
