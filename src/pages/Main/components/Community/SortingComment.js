import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getSortedCommentWData } from "../../../../redux/board/winwin/winBoardReducer";
import "../Components.scss";

const SortingComment = () => {
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    getSortedCommentWData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  return (
    <div className='sortingBtn'>
      <button onClick={likesData}>댓글순</button>
    </div>
  );
};

export default SortingComment;
