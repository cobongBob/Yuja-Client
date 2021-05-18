import React, { useEffect } from 'react';
import './Ynew.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMainData } from '../../redux/main/mainReducer';

const Ynew = () => {
  const dispatch = useDispatch();
  const { YmainList } = useSelector((state) => state.mainReducer);
  console.log(3333333333333333, YmainList);

  useEffect(() => {
    dispatch(getMainData());
  }, [dispatch]);

  return (
    <div>
      {YmainList.map((list) => (
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
