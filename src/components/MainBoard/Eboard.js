import React from 'react';
import './Eboard.scss';
import Enew from './Enew';

const Eboard = () => {
  return (
    <div className='Eboard-body'>
      <div className='Eboard-title'>편집자 소개</div>
      <div>
        <Enew />
      </div>
    </div>
  );
};

export default Eboard;
