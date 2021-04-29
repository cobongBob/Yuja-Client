import React from 'react';
import './scss/Ynew.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MOCK_DATA from '../pages/MOCK_DATA.json';

const Ynew = () => {
  console.log('MOCK_DATA: ', typeof MOCK_DATA);
  console.log(MOCK_DATA);

  return (
    <>
      <div className='new-youtuber'>
        <div className='user-profile-pic'>
          <FaUserAstronaut size={60} className='youtuber-profile' />
        </div>
        <div className='wanted-content'>
          <span className='wanted-name'>
            <Link to='/YoutuberProfile'>{MOCK_DATA[0].user_id}</Link>
          </span>
          <span className='wanted-type'>편집자</span> <br />
          <span className='wanted-content-detail'>
            <Link to='/Ydetail/:board_id'>{MOCK_DATA[0].title}</Link>
          </span>
        </div>
      </div>
      <div className='new-youtuber'>
        <div className='user-profile-pic'>
          <FaUserAstronaut size={60} className='youtuber-profile' />
        </div>
        <div className='wanted-content'>
          <span className='wanted-name'>
            <Link to='/YoutuberProfile'>{MOCK_DATA[1].user_id}</Link>
          </span>
          <span className='wanted-type'>편집자</span> <br />
          <span className='wanted-content-detail'>
            <Link to='/Ydetail/:board_id'>{MOCK_DATA[1].title}</Link>
          </span>
        </div>
      </div>
      <div className='new-youtuber'>
        <div className='user-profile-pic'>
          <FaUserAstronaut size={60} className='youtuber-profile' />
        </div>
        <div className='wanted-content'>
          <span className='wanted-name'>
            <Link to='/YoutuberProfile'>{MOCK_DATA[2].user_id}</Link>
          </span>
          <span className='wanted-type'>편집자</span> <br />
          <span className='wanted-content-detail'>
            <Link to='/Ydetail/:board_id'>{MOCK_DATA[2].title}</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Ynew;
