import React from "react";
import "./Ynew.scss";
import { FaUserAstronaut } from "react-icons/fa";
import { Link } from "react-router-dom";

const Ynew = () => {
  return (
    <div>
      <ul>
        <div className='new-youtuber'>
          <li>
            <div className='user-profile-pic'>
              <FaUserAstronaut size={60} className='youtuber-profile' />
            </div>
            <div className='wanted-content'>
              <span className='wanted-name'>
                <Link to='/YoutuberProfile'>유저아이디</Link>
              </span>
              <span className='wanted-type-editer'>편집자</span> <br />
              <span className='wanted-content-detail'>
                <Link to='/Ydetail/:board_id'>제목</Link>
              </span>
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Ynew;
