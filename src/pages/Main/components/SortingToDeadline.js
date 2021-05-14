import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getSortExData } from "../../../redux/board/youtube/yboardReducer";
import "./Components.scss";

const SortingToDeadline = () => {
  const dispatch = useDispatch();
  const expiredData = useCallback(() => {
    getSortExData().then((res) => {
      dispatch(res);
    });
  }, [dispatch]);

  return (
    <div className='sortingBtn'>
      <button onClick={expiredData}>마감순</button>
    </div>
  );
};

export default SortingToDeadline;
