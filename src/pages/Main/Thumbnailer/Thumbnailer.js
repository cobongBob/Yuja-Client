import React, { useEffect, useState } from 'react';
import ThumbnailerTable from './ThumbnailerTable';
import '../Youtuber/Youtuber.scss';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../redux/board/thumbnail/thboardReducer';
// nav에서 썸네일러를 누르면 보이는 전체 컴포넌트
const Thumbnailer = () => {
  const boardData = useSelector((state) => state.ThboardReducer.data);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(12);

  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = boardData.slice(indexOfFirstData, indexOfLastData);

  const clickPage = (pages) => {
    setCurrentPage(pages);
  };

  useEffect(() => {
    getData().then((res) => {
      dispatch(res);
      console.log('게시판데이터', res);
      // console.log('여긴 유즈이펙트', res);
    });
  }, []);
  return (
    <div className='tableWrapper'>
      <ThumbnailerTable boardData={currentData} />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={boardData.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Thumbnailer;
