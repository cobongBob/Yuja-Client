import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSide = () => {
  const pathname = useLocation().pathname;
  return (
    <>
      <div className='sideMenu'>
        <div className='sideMenu-title'>관리하기</div>
        <br />
        <div>
          <ul>
            <Link to={`/Admin/AdminUsers`}>
              <li className={pathname.includes("/AdminUsers") ? "li-link-disabled" : "li-winwin"}>유저관리</li>
            </Link>

            <Link to={`/Admin/AdminBoard`}>
              <li className={pathname.includes("/AdminBoard") ? "li-link-disabled" : "li-winwin"}>공지관리</li>
            </Link>

            <Link to={`/Admin/AdminReports`}>
              <li className={pathname.includes("/AdminReports") ? "li-link-disabled" : "li-winwin"}>신고관리</li>
            </Link>

            <Link to={`/Admin/AdminYoutuber`}>
              <li className={pathname.includes("/AdminYoutuber") ? "li-link-disabled" : "li-winwin"}>유튜버 인증</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSide;
