import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortedHitWData } from '../../../../redux/board/winwin/winBoardReducer';
import '../Components.scss';

const SortingHit = () => {
  const data = useSelector((state) => state.winBoardReducer);
  const checked = data.sortedwHit;
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    getSortedHitWData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  return (
    <button
      onClick={likesData}
      className={checked ? 'sortingBtn-on' : 'sortingBtn'}
    >
      조회순
    </button>
  );
};

export default SortingHit;
