import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import getFormatDate from "../../../modules/getFormatDate";
import { MdFiberNew } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import SortingDate from "../components/Community/SortingDate";
import SortingHit from "../components/Community/SortingHit";
import SortingLike from "../components/Community/SortingLike";
import SortingComment from "../components/Community/SortingComment";
import "./Winwin.scss";
import { ToastCenter } from "../../../modules/ToastModule";

const WinTable = ({ currentData, board_type, lastIdx, currentPage, allNotices, userData }) => {
  let board_name = "";
  switch (board_type) {
    case "Winwin":
      board_name = "성장";
      break;
    case "Collabo":
      board_name = "합방";
      break;
    case "CustomService":
      board_name = "건의";
      break;
    case "Free":
      board_name = "자유";
      break;
    default:
      board_name = "???";
      break;
  }
  const history = useHistory();
  const writeBoard = useCallback(() => {
    if (userData && userData.id > 0) {
      history.push(`/BoardRegister/${board_type}`);
    } else {
      ToastCenter(`로그인 해주세요`);
    }
  }, [userData, board_type, history]);
  return (
    <div className='winTable-Table-Wrapper'>
      <h2 className='boardName'>{board_name}게시판</h2>
      <div className='community-options'>
        <button onClick={writeBoard} className='registerBtn'>
          글쓰기
        </button>
      </div>
      <div className='community-options'>
        <SortingDate />
        <SortingHit />
        <SortingLike />
        <SortingComment />
      </div>
      <div className='community-table-wrapper'>
        <table className='cummunity-table-itself'>
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
