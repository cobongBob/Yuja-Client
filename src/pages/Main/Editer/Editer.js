import React, { useEffect, useState } from 'react';
import EditerTable from './EditerTable';
import '../Youtuber/Youtuber.scss';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../redux/board/editer/eboardReducer';

const Editor = () => {
  const boardData = useSelector((state) => state.EboardReducer.data);
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
      <EditerTable boardData={currentData} />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={boardData.length}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Editor;
