import React from 'react';
import ThumbnailerTable from './ThumbnailerTable';
import '../Youtuber/Youtuber.scss';
// nav에서 썸네일러를 누르면 보이는 전체 컴포넌트
const Thumbnailer = () => {
  return (
    <div className='tableWrapper'>
      <ThumbnailerTable />
    </div>
  );
};

export default Thumbnailer;
