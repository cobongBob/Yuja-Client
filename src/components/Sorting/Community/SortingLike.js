import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortedLikeWData } from '../../../redux/board/winwin/winBoardReducer';
import '../../Components.scss';

const SortingLike = () => {
  const data = useSelector((state) => state.winBoardReducer);
  const checked = data.sortedwLike;
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    getSortedLikeWData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  return (
    <button
      onClick={likesData}
      className={checked ? 'sortingBtn-on' : 'sortingBtn'}
    >
      인기순
    </button>
  );
};

export default SortingLike;
