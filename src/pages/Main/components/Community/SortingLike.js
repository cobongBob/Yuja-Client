import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getSortedLikeWData } from '../../../../redux/board/winwin/winBoardReducer';
import '../Components.scss';

const SortingLike = () => {
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    getSortedLikeWData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  return (
    <div className='community-sortingBtn'>
      <button onClick={likesData}>인기순</button>
    </div>
  );
};

export default SortingLike;
