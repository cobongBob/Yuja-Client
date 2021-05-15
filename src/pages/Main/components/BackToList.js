import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getResetData } from '../../../redux/board/youtube/yboardReducer';

const BackToList = () => {
  const dispatch = useDispatch();
  const resetPage = useCallback(() => {
    getResetData().then((res) => {
      dispatch(res);
      console.log(2222, resetPage);
    });
  }, [dispatch]);

  return (
    <div className='sortingBtn'>
      <button onClick={resetPage}>목록</button>
    </div>
  );
};

export default BackToList;
