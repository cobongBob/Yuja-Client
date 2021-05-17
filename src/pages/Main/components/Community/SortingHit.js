import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getSortedHitWData } from "../../../../redux/board/winwin/winBoardReducer";
import "../Components.scss";

const SortingHit = () => {
  const dispatch = useDispatch();
  const likesData = useCallback(() => {
    getSortedHitWData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);
  return (
    <div className='sortingBtn'>
      <button onClick={likesData}>조회순</button>
    </div>
  );
};

export default SortingHit;
