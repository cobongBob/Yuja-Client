import React from 'react';
import Ytable from './Ytable';
import '../components/scss/Youtuber.scss';
// nav에서 유튜버를 누르면 보이는 전체 컴포넌트
const Youtuber = () => {
  return (
    <div className='YtableWrapper'>
      <Ytable></Ytable>
    </div>
  );
};

export default Youtuber;
