import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../redux/board/editer/eboardReducer';

const BackToList = () => {
  const { userData } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const resetPage = useCallback(() => {
    if (userData.id) {
      getData(userData.id).then((res) => {
        dispatch(res);
        console.log(333333333333, res);
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
