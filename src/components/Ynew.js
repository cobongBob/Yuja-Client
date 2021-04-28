import React from 'react';
import './scss/Ynew.scss';
import { FaUserAstronaut } from 'react-icons/fa';

const Ynew = () => {
  return (
    <div className='new-youtuber'>
      <FaUserAstronaut className='user-profile-pic' />
      New! 공고
    </div>
  );
};

export default Ynew;
