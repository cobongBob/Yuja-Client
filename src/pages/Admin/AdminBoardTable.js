import React from "react";
import { Link } from "react-router-dom";

const AdminBoardTable = ({ currentData, lastIdx, currentPage, noticeSwitch }) => {
  return (
    <div>
      <div className='community-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th className='user_no'>글 번호</th>
              <th className='board_content'>제목</th>
              <th className='report_title'>작성자</th>
              <th className='user_no'>조회수</th>
              <th className='user_regDate'>작성일</th>
              <th className='user_option'>상태</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((notice, idx) => (
                <tr key={idx}>
                  <td>{lastIdx - idx}</td>
                  <td>
                    <Link className='table_link' to={`/BoardDetail/Notice/${notice.id}/${currentPage}`}>
                      {notice.title}
                      <span className='commentNum'> [{notice.comments}] </span>
                    </Link>
                  </td>
                  <td>{notice.user.nickname}</td>
                  <td>{notice.hit}</td>
                  <td>{notice.createDate.substr(0, 10)}</td>
                  {notice.isPrivate ? (
                    <td className='notice_option' style={{ color: "blue" }} onClick={() => noticeSwitch(notice.id)}>
                      공지 공개중
                    </td>
                  ) : (
                    <td className='notice_option' style={{ color: "gray" }} onClick={() => noticeSwitch(notice.id)}>
                      공지 비공개중
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBoardTable;
