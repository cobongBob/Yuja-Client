import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortLikes } from '../../../redux/board/youtube/yboardReducer';
import './Components.scss';

const SortingToLiked = ({ boardData }) => {
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    sortLikes().then((res) => {
      dispatch(res);
      console.log('인기순', res);
    });
  }, [boardData]);
  return (
    <div className='sortingBtn'>
      <button onClick={likesData}>인기순</button>
    </div>
  );
};

export default SortingToLiked;
