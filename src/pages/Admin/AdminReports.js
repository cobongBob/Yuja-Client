import React, { useCallback, useState } from "react";
import Pagination from "../../components/Pagination";
import AdminReportsTable from "./AdminReportsTable";

const AdminReports = ({ allReports, deleteReported, reject }) => {
  //페이징
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(10);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = allReports.slice(indexOfFirstData, indexOfLastData);
  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);

  return (
    <div className='admin_board'>
      <h1 className="boardName">신고게시판</h1>
      <AdminReportsTable
        currentData={currentData}
        lastIdx={allReports.length - 10 * (currentPage - 1)}
        currentPage={currentPage}
        deleteReported={deleteReported}
        reject={reject}
      />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={allReports.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default AdminReports;
