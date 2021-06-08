import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortLikeData } from '../../redux/board/youtube/yboardReducer';
import { getESortLikeData } from '../../redux/board/editer/eboardReducer';
import '../Components.scss';

const SortingToLiked = ({ board_type }) => {
  const dispatch = useDispatch();
  const yBoardData = useSelector((state) => state.YboardReducer);
  const eBoardData = useSelector((state) => state.EboardReducer);
  const yChecked = yBoardData.sortedLike;
  const eChecked = eBoardData.sortedLike;

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
    <div>
      {board_type === 'Youtuber' ? (
        <button
          onClick={likesData}
          className={yChecked ? 'sortingBtn-on' : 'sortingBtn'}
        >
          인기순
        </button>
      ) : (
        <button
          onClick={likesEData}
          className={eChecked ? 'sortingBtn-on' : 'sortingBtn'}
        >
          인기순
        </button>
      )}
    </div>
  );
};

export default SortingToLiked;
