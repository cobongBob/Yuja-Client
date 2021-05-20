import React, { useCallback, useState } from "react";
import Pagination from "../Main/components/Pagination";
import AdminYoutuberTable from "./AdminYoutuberTable";

const AdminYoutuber = ({ youtuberConfirm, promoteUser, rejectUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(10);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = youtuberConfirm.slice(indexOfFirstData, indexOfLastData);
  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);

  return (
    <div className='admin_board'>
      <h1>유튜버 신청</h1>
      <AdminYoutuberTable currentData={currentData} promoteUser={promoteUser} rejectUser={rejectUser} />
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
