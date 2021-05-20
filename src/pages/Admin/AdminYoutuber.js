import React, { useCallback, useState } from "react";
import Pagination from "../Main/components/Pagination";
import AdminYoutuberTable from "./AdminYoutuberTable";

const AdminYoutuber = ({ youtuberConfirm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(10);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = youtuberConfirm.slice(indexOfFirstData, indexOfLastData);
  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);

  return (
    <div>
      <h1>유튜버 신청</h1>
      <AdminYoutuberTable
        currentData={currentData}
        lastIdx={youtuberConfirm.length - 10 * (currentPage - 1)}
        currentPage={currentPage}
      />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={youtuberConfirm.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default AdminYoutuber;
