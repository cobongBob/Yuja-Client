import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getSortLikeData } from '../../../redux/board/youtube/yboardReducer';
import './Components.scss';

const SortingToLiked = () => {
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    getSortLikeData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  return (
    <div className='sortingBtn'>
      <button onClick={likesData}>인기순</button>
    </div>
  );
};

export default SortingToLiked;
