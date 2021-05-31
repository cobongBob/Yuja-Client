import React from 'react';
import './new.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Ynew = () => {
  const { YmainList } = useSelector((state) => state.mainReducer);
  const history = useHistory();
  return (
    <div>
      {YmainList &&
        YmainList.map((list, index) => (
          <ul key={index} className='NewList'>
            <div className='new-youtuber'>
              <li>
                <div className='ProfileWrapper'>
                  {list.previewImage ? (
                    <div
                      onClick={() => history.push(`/Ydetail/${list.id}/1`)}
                      className='user-profile-pic_'
                    >
                      <img
                        className='MainProfileImage'
                        src={`${list.previewImage}`}
                        alt=''
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => history.push(`/Ydetail/${list.id}/1`)}
                      className='user-profile-pic'
                    >
                      <FaUserAstronaut size={60} className='youtuber-profile' />
                    </div>
                  )}
                  <div className='wanted-content'>
                    <div className='NameWorkerWrapper'>
                      <span className='wanted-name'>{list.user.nickname}</span>
                      <span className='wanted-type-editer'>
                        {list.worker}
                      </span>{' '}
                    </div>
                    <div className='TitleWrapper'>
                      <p className='wanted-content-detail'>
                        <strong>
                          <Link
                            className='ListTitle'
                            to={`/Ydetail/${list.id}/1`}
                          >
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
