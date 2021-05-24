import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getSortLikeData } from '../../../redux/board/youtube/yboardReducer';
import { getESortLikeData } from '../../../redux/board/editer/eboardReducer';
import './Components.scss';

const SortingToLiked = ({ board_type }) => {
  const dispatch = useDispatch();

  const likesData = useCallback(() => {
    getSortLikeData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);

  const likesEData = useCallback(() => {
    getESortLikeData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);

  return (
    <div className='sortingBtn'>
      {board_type === 'Youtuber' ? (
        <button onClick={likesData}>인기순</button>
      ) : (
        <button onClick={likesEData}>인기순</button>
      )}
    </div>
  );
};

export default SortingToLiked;
