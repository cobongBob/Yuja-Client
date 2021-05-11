import React, { useEffect, useState } from 'react';
import './Youtuber.scss';
import { useDispatch, useSelector } from 'react-redux';
import YoutuberTable from './YoutuberTable';
import './Youtuber.scss';
import {
  getData,
  getDetailData,
} from '../../../redux/board/youtube/yboardReducer';
import Pagination from '../components/Pagination';
// nav에서 유튜버를 누르면 보이는 전체 컴포넌트
const Youtuber = () => {
  // Youtuber의 전체 데이터 불러오기
  const boardData = useSelector((state) => state.YboardReducer.data);
  const dispatch = useDispatch();

  //페이징 처리하기
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
      <YoutuberTable boardData={currentData} />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={boardData.length}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Youtuber;
