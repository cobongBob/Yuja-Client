import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortExData } from '../../../redux/board/youtube/yboardReducer';
import './Components.scss';

const SortingToDeadline = () => {
  const dispatch = useDispatch();
  const yBoardData = useSelector((state) => state.YboardReducer);
  const checked = yBoardData.sortedExpired;
  const expiredData = useCallback(() => {
    getSortExData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);

  return (
    <button
      onClick={expiredData}
      className={checked ? 'sortingBtn-on' : 'sortingBtn'}
    >
      마감순
    </button>
  );
};

export default SortingToDeadline;
