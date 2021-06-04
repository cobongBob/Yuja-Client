import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import './myPage.scss';
import MyPageLikeWrite from './MyPageLikeWrite';
import MyPagePortfolioTable from './MyPagePortfolioTable';
import MyPageYoutuberTable from './MyPageYoutuberTable';

const MyPageTable = ({ boardData }) => {
  return (
    <div className='tableWrapper'>
      <span className='beforeModifyTitle'>즐겨찾기 목록 </span>
      <div className='myPage-flexBox'>
        <MyPageYoutuberTable boardData={boardData} board_code={1} />
        <MyPageLikeWrite boardData={boardData} board_code={4} />
      </div>
      <div className='myPage-flexBox'>
        <MyPagePortfolioTable boardData={boardData} board_code={2} />
        <MyPagePortfolioTable boardData={boardData} board_code={3} />
      </div>
    </div>
  );
};

export default MyPageTable;
