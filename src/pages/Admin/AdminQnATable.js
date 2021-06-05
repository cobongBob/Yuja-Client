import React from "react";
import { Link } from "react-router-dom";

const AdminQnATable = ({ currentData, lastIdx, deleteQnA }) => {
  return (
    <div>
      <div className='community-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th className='user_no'>글 번호</th>
              <th className='board_content'>제목</th>
              <th className='report_title'>작성자</th>
              <th className='user_regDate'>작성일</th>
              <th className='user_option'>옵션</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((qna, idx) => (
                <tr key={idx}>
                  <td>{lastIdx - idx}</td>
                  <td>
                    <Link className='table_link' to={`/Help`}>
                      {qna.title}
                    </Link>
                  </td>
                  <td>{qna.user.nickname}</td>
                  <td>{qna.createDate.substr(0, 10)}</td>
                  <td className='notice_option' style={{ color: "red" }} onClick={() => deleteQnA(qna.id)}>
                    삭제
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQnATable;
