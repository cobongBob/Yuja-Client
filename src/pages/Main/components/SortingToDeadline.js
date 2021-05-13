import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortExpiredDate } from '../../../redux/board/youtube/yboardReducer';
import './Components.scss';

const SortingToDeadline = ({ boardData }) => {
  const dispatch = useDispatch();
  const expiredData = useCallback(() => {
    sortExpiredDate().then((res) => {
      dispatch(res);
      console.log('마감순', res);
    });
  }, [boardData]);

  return (
    <div className='sortingBtn'>
      <button onClick={expiredData}>마감순</button>
    </div>
  );
};

export default SortingToDeadline;
