import React, { useCallback, useState } from "react";
import Pagination from "../Main/components/Pagination";
import "./AdminUser.scss";
import AdminUsersTable from "./AdminUsersTable";

const AdminUsers = ({ allUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(10);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = allUsers.slice(indexOfFirstData, indexOfLastData);
  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);

  return (
    <div>
      <h1>유저관리</h1>
      <AdminUsersTable
        currentData={currentData}
        lastIdx={allUsers.length - 10 * (currentPage - 1)}
        currentPage={currentPage}
      />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={allUsers.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default AdminUsers;
