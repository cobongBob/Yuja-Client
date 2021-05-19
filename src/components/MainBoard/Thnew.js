import React from 'react';
import './new.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Thnew = () => {
  const { ThmainList } = useSelector((state) => state.mainReducer);
  return (
    <div>
      {ThmainList &&
        ThmainList.map((list) => (
          <ul className='NewList'>
            <div className='new-youtuber'>
              <li>
                <div className='ProfileWrapper'>
                  <div className='user-profile-pic'>
                    <FaUserAstronaut size={60} className='thumbnail-profile' />
                  </div>
                  <div className='wanted-content'>
                    <div className='NameWorkerWrapper'>
                      <span className='wanted-name'>
                        <Link to={`/Ydetail/${list.id}`}>
                          {list.user.nickname}
                        </Link>
                      </span>
                    </div>
                    <div className='TitleWrapper'>
                      <p className='wanted-content-detail'>
                        <strong>
                          <Link to={`/Ydetail/${list.id}`}>{list.title}</Link>
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        ))}
    </div>
  );
};

export default Thnew;
