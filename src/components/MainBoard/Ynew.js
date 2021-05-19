import React from 'react';
import './new.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Ynew = () => {
  const { YmainList } = useSelector((state) => state.mainReducer);

  return (
    <div>
      {YmainList &&
        YmainList.map((list, index) => (
          <ul key={index} className='NewList'>
            <div className='new-youtuber'>
              <li>
                <div className='ProfileWrapper'>
                  <div className='user-profile-pic'>
                    <FaUserAstronaut size={60} className='youtuber-profile' />
                  </div>
                  <div className='wanted-content'>
                    <div className='NameWorkerWrapper'>
                      <span className='wanted-name'>
                        <Link to={`/Ydetail/${list.id}`}>
                          {list.user.nickname}
                        </Link>
                      </span>
                      <span className='wanted-type-editer'>{list.worker}</span>{' '}
                    </div>
                    <div className='TitleWrapper'>
                      <p className='wanted-content-detail'>
                        <strong>
                          <Link
                            className='ListTitle'
                            to={`/Ydetail/${list.id}`}>
                            {list.title}
                          </Link>
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

export default Ynew;
