import React from 'react';
import './scss/Ynew.scss';
import { FaUserAstronaut } from 'react-icons/fa';

const Ynew = () => {
  return (
    <>
      <div className='new-youtuber'>
        <div className='user-profile-pic'>
          <FaUserAstronaut size={60} className='youtuber-profile' />
        </div>
        <div className='wanted-content'> New! 공고</div>
      </div>
    </>
  );
};

export default Ynew;
