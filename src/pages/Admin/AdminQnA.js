import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Main/components/Pagination";
import AdminQnATable from "./AdminQnATable";

const AdminQnA = ({ allQnAs, deleteQnA }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(10);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = allQnAs.slice(indexOfFirstData, indexOfLastData);
  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);
  return (
    <div className='admin_board'>
      <h1>고객센터 게시판</h1>
      <div className='community-options'>
        <Link to={`/BoardRegister/QnA`} className='registerBtn'>
          글쓰기
        </Link>
      </div>
      <AdminQnATable
        currentData={currentData}
        lastIdx={allQnAs.length - 10 * (currentPage - 1)}
        currentPage={currentPage}
        deleteQnA={deleteQnA}
      />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={allQnAs.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default AdminQnA;
