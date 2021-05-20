import React, { useCallback, useState } from "react";
import Pagination from "../Main/components/Pagination";
import AdminReportsTable from "./AdminReportsTable";

const AdminReports = ({ allReports }) => {
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
    <div>
      <h1>신고게시판</h1>
      <AdminReportsTable
        currentData={currentData}
        lastIdx={allReports.length - 10 * (currentPage - 1)}
        currentPage={currentPage}
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
