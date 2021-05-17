import React from "react";
import { Link } from "react-router-dom";
import getFormatDate from "../../../getFormatDate";
import { MdFiberNew } from "react-icons/md";
import SortingDate from "../components/Community/SortingDate";
import SortingHit from "../components/Community/SortingHit";
import SortingLike from "../components/Community/SortingLike";
import SortingComment from "../components/Community/SortingComment";

const WinTable = ({ currentData, board_type, lastIdx }) => {
  return (
    <div>
      <div>
        <Link to={`/BoardRegister/${board_type}`} className='registerBtn'>
          글쓰기
        </Link>
      </div>
      <div className='card-options'>
        <SortingDate />
        <SortingHit />
        <SortingLike />
        <SortingComment />
      </div>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th className='no'>번호</th>
              <th className='title'>제목</th>
              <th className='writer'>작성자</th>
              <th className='createdDate'>작성일</th>
              <th className='hit'>조회수</th>
              <th className='like'>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((board, idx) => (
                <tr key={board.id}>
                  <td>{lastIdx - idx}</td>
                  <td>
                    <Link className='table_link' to={`/BoardDetail/${board_type}/${board.id}`}>
                      {board.title}
                      <span className='commentNum'> [{board.comments}] </span>
                    </Link>
                    {board.createDate.substr(0, 10) === getFormatDate(new Date()) ? (
                      <MdFiberNew className='new_icon' size='25' />
                    ) : null}
                  </td>
                  <td>{board.user.nickname}</td>
                  <td>{board.createDate.substr(0, 10)}</td>
                  <td>{board.hit}</td>
                  <td>{board.likes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinTable;
