import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Winwin.scss";

const WSide = () => {
  const pathname = useLocation().pathname;
  return (
    <>
      <div className='sideMenu'>
        <div className='sideMenu-title'>커뮤니티</div>
        <br />
        <div>
          <ul>
            <Link to={`/Community/Winwin/1`}>
              <li className={pathname.includes("/Winwin") ? "li-link-disabled" : "li-winwin"}>윈윈</li>
            </Link>
            <br />
            <Link to={`/Community/Collabo/1`}>
              <li className={pathname.includes("/Collabo") ? "li-link-disabled" : "li-winwin"}>합방해요</li>
            </Link>
            <br />
            <Link to={`/Community/Free/1`}>
              <li className={pathname.includes("/Free") ? "li-link-disabled" : "li-winwin"}>자유게시판</li>
            </Link>
            <br />
            <Link to={`/Community/CustomService/1`}>
              <li className={pathname.includes("/CustomService") ? "li-link-disabled" : "li-winwin"}>건의합니다</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WSide;