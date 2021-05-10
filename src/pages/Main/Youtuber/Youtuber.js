import React from 'react';
import './Youtuber.scss';
import YoutuberTable from './YoutuberTable';
// nav에서 유튜버를 누르면 보이는 전체 컴포넌트
const Youtuber = () => {
  return (
    <div className='tableWrapper'>
      <YoutuberTable />
    </div>
  );
};

export default Youtuber;
