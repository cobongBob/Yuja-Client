import React, { useEffect } from 'react';
import './Thnew.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMainData } from '../../redux/main/mainReducer';

const Thnew = () => {
  const dispatch = useDispatch();
  const { ThmainList } = useSelector((state) => state.mainReducer);
  console.log(555555555555555, ThmainList);

  useEffect(() => {
    dispatch(getMainData());
  }, [dispatch]);

  return (
    <div>
      {ThmainList.map((list) => (
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

export default Thnew;
