import React from 'react';
import './scss/Yboard.scss';
import Ynew from './Ynew';

const Yboard = () => {
  return (
    <div className='Yboard-body'>
      <div className='Yboard-title'>구인공고</div>
      <div>
        <Ynew />
        <Ynew />
        <Ynew />
      </div>
    </div>
  );
};

export default Yboard;
