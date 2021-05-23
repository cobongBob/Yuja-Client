import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Main/components/Pagination";
import AdminBoardTable from "./AdminBoardTable";

const AdminBoard = ({ allBoards, noticeSwitch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(10);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = allBoards.slice(indexOfFirstData, indexOfLastData);
  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);
  return (
    <div className='admin_board'>
      <h1>공지게시판</h1>
      <div className='community-options'>
        <Link to={`/BoardRegister/Notice`} className='registerBtn'>
          글쓰기
        </Link>
      </div>
      <AdminBoardTable
        currentData={currentData}
        lastIdx={allBoards.length - 10 * (currentPage - 1)}
        currentPage={currentPage}
        noticeSwitch={noticeSwitch}
      />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={allBoards.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default AdminBoard;
