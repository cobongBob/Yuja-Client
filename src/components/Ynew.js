import React from 'react';
import './scss/Ynew.scss';
import { FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MOCK_DATA from '../pages/MOCK_DATA';

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
            <Link to='/YoutuberProfile'>닉네임</Link>
          </span>
          <span className='wanted-type'>편집자</span> <br />
          <span className='wanted-content-detail'>
            <Link to='/Ydetail/:board_id'>
              [에프터이펙트]를 사용하는 편집자를 구합니다.
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Ynew;
