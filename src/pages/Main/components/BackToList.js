import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getResetData } from '../../../redux/board/youtube/yboardReducer';

const BackToList = () => {
  const dispatch = useDispatch();
  const resetPage = useCallback(() => {
    getResetData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);

  return (
    <button onClick={resetPage} className={'sortingBtn'}>
      목록
    </button>
  );
};

export default BackToList;
