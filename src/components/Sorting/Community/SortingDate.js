import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getSortedDateWData } from '../../../redux/board/winwin/winBoardReducer';
import '../../Components.scss';

const SortingDate = () => {
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    getSortedDateWData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  return (
    <button onClick={likesData} className='sortingBtn'>
      목록
    </button>
  );
};

export default SortingDate;
