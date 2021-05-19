import React from 'react';
import './new.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Enew = () => {
  const { EmainList } = useSelector((state) => state.mainReducer);

  return (
    <div>
      {EmainList &&
        EmainList.map((list) => (
          <ul>
            <div className='new-youtuber'>
              <li>
                <div className='user-profile-pic'>
                  <FaUserAstronaut size={60} className='youtuber-profile' />
                </div>
                <div className='wanted-content'>
                  <span className='wanted-name'>
                    <Link to={`/Ydetail/${list.id}`}>{list.user.username}</Link>
                  </span>{' '}
                  <br />
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

export default Enew;
