import React from "react";
import { Link } from "react-router-dom";
import getFormatDate from "../../../modules/getFormatDate";
import { MdFiberNew } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import SortingDate from "../components/Community/SortingDate";
import SortingHit from "../components/Community/SortingHit";
import SortingLike from "../components/Community/SortingLike";
import SortingComment from "../components/Community/SortingComment";
import "./Winwin.scss";

const WinTable = ({ currentData, board_type, lastIdx, currentPage, allNotices }) => {
  let board_name = "";
  switch (board_type) {
    case "Winwin":
      board_name = "윈윈";
      break;
    case "Collabo":
      board_name = "합방해요";
      break;
    case "CustomService":
      board_name = "건의게시판";
      break;
    case "Free":
      board_name = "자유게시판";
      break;
    default:
      board_name = "???";
      break;
  }
  return (
    <div className='table-Wrapper'>
      <h2>{board_name}</h2>
      <div className='community-options'>
        <Link to={`/BoardRegister/${board_type}`} className='registerBtn'>
          글쓰기
        </Link>
      </div>
      <div className='community-options'>
        <SortingDate />
        <SortingHit />
        <SortingLike />
        <SortingComment />
      </div>
      <div className='community-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th className='wno'>번호</th>
              <th className='wtitle'>제목</th>
              <th className='wwriter'>작성자</th>
              <th className='wcreatedDate'>작성일</th>
              <th className='whited'>조회수</th>
              <th className='wlike'>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {allNotices &&
              allNotices.map(
                (notice, idx) =>
                  notice.isPrivate && (
                    <tr key={notice.id} className='community_notice'>
                      <td>{idx + 1}</td>
                      <td>
                        <Link className='table_link' to={`/BoardDetail/${board_type}/${notice.id}/${currentPage}`}>
                          {notice.title}
                          <span className='commentNum'> [{notice.comments}] </span>
                        </Link>
                        {notice.createDate.substr(0, 10) === getFormatDate(new Date()) ? (
                          <MdFiberNew className='new_icon' size='25' />
                        ) : null}
                      </td>
                      <td>{notice.user.nickname}</td>
                      <td>{notice.createDate.substr(0, 10)}</td>
                      <td>{notice.hit}</td>
                      <td>{notice.likes}</td>
                    </tr>
                  )
              )}
          </tbody>
          <tbody>
            {currentData &&
              currentData.map((board, idx) => (
                <tr key={board.id}>
                  <td>{lastIdx - idx}</td>
                  <td>
                    {board.isPrivate && board.boardType.boardName !== "NoticeBoard" ? (
                      <RiGitRepositoryPrivateFill />
                    ) : null}
                    <Link className='table_link' to={`/BoardDetail/${board_type}/${board.id}/${currentPage}`}>
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
