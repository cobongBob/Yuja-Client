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
              <div className="admin_li"><li className={pathname.includes("/AdminUsers") ? "li-link-disabled" : "li-winwin"}>유저 관리</li></div> 
            </Link>

            <Link to={`/Admin/AdminBoard`}>
              <div className="admin_li"><li className={pathname.includes("/AdminBoard") ? "li-link-disabled" : "li-winwin"}>공지 관리</li></div>
            </Link>

            <Link to={`/Admin/AdminReports`}>
              <div className="admin_li"><li className={pathname.includes("/AdminReports") ? "li-link-disabled" : "li-winwin"}>신고 관리</li></div>
            </Link>

            <Link to={`/Admin/AdminYoutuber`}>
              <div className="admin_li"><li className={pathname.includes("/AdminYoutuber") ? "li-link-disabled" : "li-winwin"}>유튜버 인증</li></div>
            </Link>

            <Link to={`/Admin/AdminQnA`}>
              <div className="admin_li"><li className={pathname.includes("/AdminQnA") ? "li-link-disabled" : "li-winwin"}>고객센터 관리</li></div>
            </Link>

            <Link to={`/Admin/AdminStats`}>
              <div className="admin_li"><li className={pathname.includes("/AdminStats") ? "li-link-disabled" : "li-winwin"}>유자 통계</li></div>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSide;
