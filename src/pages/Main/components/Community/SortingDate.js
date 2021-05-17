import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getSortedDateWData } from "../../../../redux/board/winwin/winBoardReducer";
import "../Components.scss";

const SortingDate = () => {
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    getSortedDateWData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  return (
    <div className='sortingBtn'>
      <button onClick={likesData}>목록</button>
    </div>
  );
};

export default SortingDate;
