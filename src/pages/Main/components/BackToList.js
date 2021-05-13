import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../redux/board/editer/eboardReducer';
import { getFilterData } from '../../../redux/board/youtube/yboardReducer';

const BackToList = () => {
  const { userData } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const resetPage = useCallback(() => {
    if (userData.id) {
      getData(userData.id).then((res) => {
        dispatch(res);
        getFilterData('').then((res) => {
          dispatch(res);
        });
      });
    } else {
      getData(0).then((res) => {
        dispatch(res);
        getFilterData('').then((res) => {
          dispatch(res);
        });
      });
    }
  }, [userData]);

  return (
    <div className='sortingBtn'>
      <button onClick={resetPage}>목록</button>
    </div>
  );
};

export default BackToList;
