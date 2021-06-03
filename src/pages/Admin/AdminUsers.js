import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../Main/components/Pagination";
import Search from "../Main/components/Search";
import "./AdminUser.scss";
import AdminUsersTable from "./AdminUsersTable";

const AdminUsers = ({ allUsers, userSetBan, userRemove, userRecovery }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(10);
  const [indexOfLastData, setIndexOfLastData] = useState(currentPage * boardPerPage);
  const [indexOfFirstData, setIndexOfFirstData] = useState(indexOfLastData - boardPerPage);
  const [originalData, setOriginalData] = useState(allUsers);
  const [currentData, setCurrentData] = useState(allUsers.slice(indexOfFirstData, indexOfLastData));
  const clickPage = useCallback(
    (pages) => {
      setCurrentPage(pages);
      setIndexOfLastData(pages * boardPerPage);
      setIndexOfFirstData(pages * boardPerPage - boardPerPage);
      setCurrentData(originalData.slice(pages * boardPerPage - boardPerPage, pages * boardPerPage));
    },
    [boardPerPage, originalData]
  );

  const searchHandler = useCallback(
    (keyword) => {
      setSearchTerm(keyword);
      setCurrentData(
        allUsers
          .filter((data) => {
            if (Object && Object.values(data.nickname).join("").toLowerCase().includes(keyword.toLowerCase())) {
              return data;
            } else if (Object && Object.values(data.username).join("").toLowerCase().includes(keyword.toLowerCase())) {
              return data;
            }
            return null;
          })
          .slice(indexOfFirstData, indexOfLastData)
      );
      setOriginalData(
        allUsers.filter((data) => {
          if (Object && Object.values(data.nickname).join("").toLowerCase().includes(keyword.toLowerCase())) {
            return data;
          } else if (Object && Object.values(data.username).join("").toLowerCase().includes(keyword.toLowerCase())) {
            return data;
          }
          return null;
        })
      );
    },
    [allUsers, indexOfFirstData, indexOfLastData]
  );

  useEffect(() => {
    if (currentPage > Math.ceil(originalData.length / boardPerPage)) {
      clickPage(1);
    } else {
      clickPage(currentPage);
    }
  }, [originalData, clickPage, indexOfLastData, currentPage, boardPerPage]);
  useEffect(() => {
    searchHandler(searchTerm);
    clickPage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsers]);

  return (
    currentData && (
      <div className='admin_board'>
        <h1>유저관리</h1>
        <AdminUsersTable
          currentData={currentData}
          userSetBan={userSetBan}
          userRemove={userRemove}
          userRecovery={userRecovery}
        />
        <Search term={searchTerm} setTerm={setSearchTerm} searchKeyword={searchHandler} />
        <Pagination
          boardPerPage={boardPerPage}
          totalBoards={originalData.length}
          currentPage={currentPage}
          clickPage={clickPage}
        />
      </div>
    )
  );
};

export default AdminUsers;
