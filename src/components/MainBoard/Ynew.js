import React from "react";
import "./Ynew.scss";
import { FaUserAstronaut } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Ynew = () => {
  const { YmainList } = useSelector((state) => state.mainReducer);

  return (
    <div>
      {YmainList &&
        YmainList.map((list) => (
          <ul>
            <div className='new-youtuber'>
              <li>
                <div className='user-profile-pic'>
                  <FaUserAstronaut size={60} className='youtuber-profile' />
                </div>
                <div className='wanted-content'>
                  <span className='wanted-name'>
                    <Link to={`/Ydetail/${list.id}`}>{list.user.username}</Link>
                  </span>
                  <span className='wanted-type-editer'>{list.worker}</span> <br />
                  <span className='wanted-content-detail'>
                    <Link to={`/Ydetail/${list.id}`}>{list.title}</Link>
                  </span>
                </div>
              </li>
            </div>
          </ul>
        ))}
    </div>
  );
};

export default Ynew;
