import React from 'react';
import './Thboard.scss';
import Thnew from './Thnew';

const Thboard = () => {
  return (
    <div className='Sboard-body'>
      <div className='Sboard-title'>썸네일러 소개</div>
      <div>
        <Thnew />
      </div>
    </div>
  );
};

export default Thboard;
