import React from "react";
import "./Navi.scss";
import { Link, useLocation } from "react-router-dom";
import "./SignButton.scss";
import LoginModal from "../Login-SignUp/Login/LoginModal";
import { useSelector } from "react-redux";

const Navi = ({ allNotifications, setModalIsOpen }) => {
  const pathname = useLocation().pathname;
  const { authorities } = useSelector((state) => state.loginReducer);
  return (
    <div className='nav'>
      <ul className='nav-pills' defaultValue='/'>
        <Link to='/'>
          <li className={pathname === "/" ? "nav-link-disabled" : "nav-link"}>메인</li>
        </Link>
        <Link to='/Youtuber/1'>
          <li
            className={
              pathname.includes("/Youtuber") ||
              pathname.includes("/Ydetail") ||
              pathname.includes("/YoutuberRegister") ||
              pathname.includes("/YboardModify")
                ? "nav-link-disabled"
                : "nav-link"
            }
          >
            유튜버
          </li>
        </Link>
        <Link to='/Eboard/Editor/1'>
          <li className={pathname.includes("/Editor") ? "nav-link-disabled" : "nav-link"}>편집자</li>
        </Link>
        <Link to='/Thboard/Thumb/1'>
          <li className={pathname.includes("/Thumb") ? "nav-link-disabled" : "nav-link"}>썸네일러</li>
        </Link>
        <Link to='/Community/Winwin/1'>
          <li
            className={
              pathname.includes("/Community") || pathname.includes("/BoardDetail") || pathname.includes("/BoardModify")
                ? "nav-link-disabled"
                : "nav-link"
            }
          >
            커뮤니티
          </li>
        </Link>
        <Link to='/Help'>
          <li className={pathname === "/Help" ? "nav-link-disabled" : "nav-link"}>고객센터</li>
        </Link>
        {/*
        <Link to='/Chat'>
          <li
            className={pathname === '/Chat' ? 'nav-link-disabled' : 'nav-link'}
          >
            채팅
          </li>
        </Link>
        */}
        {authorities && authorities.includes("ADMIN") && (
          <>
            <Link to='/Admin/AdminUsers'>
              <li className={pathname.includes("/Admin") ? "nav-link-disabled" : "nav-link"}>관리페이지</li>
            </Link>
          </>
        )}
        <li className='nav-login'>
          <LoginModal allNotifications={allNotifications} setModalIsOpen={setModalIsOpen} />
        </li>
      </ul>
    </div>
  );
};

export default Navi;
