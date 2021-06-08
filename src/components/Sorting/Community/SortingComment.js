import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSortedCommentWData } from '../../../redux/board/winwin/winBoardReducer';
import '../../Components.scss';

const SortingComment = () => {
  const data = useSelector((state) => state.winBoardReducer);
  const checked = data.sortedwComment;
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    getSortedCommentWData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  return (
    <button
      onClick={likesData}
      className={checked ? 'sortingBtn-on' : 'sortingBtn'}
    >
      댓글순
    </button>
  );
};

export default SortingComment;
