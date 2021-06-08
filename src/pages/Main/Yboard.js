import React from 'react';
import './newboard.scss';
import Ynew from './Ynew';

const Yboard = () => {
  return (
    <div className='Yboard-body'>
      <div className='Yboard-title'>구인공고</div>
      <div>
        <Ynew />
      </div>
    </div>
  );
};

export default Yboard;
