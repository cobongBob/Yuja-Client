import React from 'react';
import './new.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Enew = () => {
  const { EmainList } = useSelector((state) => state.mainReducer);
  const history = useHistory();

  return (
    <div>
      {EmainList &&
        EmainList.map((list, index) => (
          <ul key={index} className='NewList'>
            <div className='new-youtuber'>
              <li>
                <div className='ProfileWrapper'>
                  {list.previewImage ? (
                    <div
                      onClick={() =>
                        history.push(`/EDetail/Editor/${list.id}/1`)
                      }
                      className='user-profile-pic_'>
                      <img
                        className='MainProfileImage'
                        src={`${list.previewImage}`}
                        alt=''
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        history.push(`/EDetail/Editor/${list.id}/1`)
                      }
                      className='user-profile-pic'>
                      <FaUserAstronaut size={60} className='editor-profile' />
                    </div>
                  )}
                  <div className='wanted-content'>
                    <div className='NameWorkerWrapper'>
                      <span className='wanted-name'>{list.user.nickname}</span>
                    </div>
                    <div className='TitleWrapper'>
                      <p className='wanted-content-detail'>
                        <strong>
                          <Link
                            className='ListTitle'
                            to={`/EDetail/Editor/${list.id}/1`}>
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

export default Enew;
