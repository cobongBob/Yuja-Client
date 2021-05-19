import React from "react";
import "./Navi.scss";
import { Link, useLocation } from "react-router-dom";
import "./SignButton.scss";
import LoginModal from "../Login-SignUp/Login/LoginModal";
const Navi = () => {
  const pathname = useLocation().pathname;
  return (
    <div className='nav'>
      <ul className='nav-pills' defaultValue='/'>
        <Link to='/'>
          <li className={pathname === "/" ? "nav-link-disabled" : "nav-link"}>메인</li>
        </Link>
        <Link to='/Youtuber'>
          <li className={pathname === "/Youtuber" ? "nav-link-disabled" : "nav-link"}>유튜버</li>
        </Link>
        <Link to='/Editer'>
          <li className={pathname === "/Editer" ? "nav-link-disabled" : "nav-link"}>편집자</li>
        </Link>
        <Link to='/Thumbnailer'>
          <li className={pathname === "/Thumbnailer" ? "nav-link-disabled" : "nav-link"}>썸네일러</li>
        </Link>
        <Link to='/Community/Winwin/1'>
          <li className={pathname.includes("/Community") ? "nav-link-disabled" : "nav-link"}>커뮤니티</li>
        </Link>
        <Link to='/Help'>
          <li className={pathname === "/Help" ? "nav-link-disabled" : "nav-link"}>고객센터</li>
        </Link>
        <Link to='/Chat'>
          <li className={pathname === "/Chat" ? "nav-link-disabled" : "nav-link"}>채팅</li>
        </Link>
        <li className='nav-login'>
          <LoginModal />
        </li>
      </ul>
    </div>
  );
};

export default Navi;
