import React, { useEffect, useRef, useState } from 'react';
import EditerTable from './EditerTable';
import '../Youtuber/Youtuber.scss';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEBoards,
  getFilterData,
} from '../../../redux/board/editer/eboardReducer';
import Search from '../components/Search';

const Editer = ({ match }) => {
  const dispatch = useDispatch();

  // Youtuber의 전체 데이터 불러오기
  const eBoardData = useSelector((state) => state.EboardReducer);
  const { userData } = useSelector((state) => state.loginReducer);
  const board_type = useRef(match.params.board_type);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(12);

  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = eBoardData.filterData.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const clickPage = (pages) => {
    setCurrentPage(pages);
  };

  useEffect(() => {
    board_type.current = match.params.board_type;
    dispatch(getEBoards(board_type.current));
  }, [userData, dispatch, match.params.board_type]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    getFilterData(searchTerm).then((res) => {
      dispatch(res);
    });
  };
  console.log(4444, match);

  return eBoardData.loading && !eBoardData ? (
    <div className='loading'></div>
  ) : eBoardData.err ? (
    <h2>{eBoardData.err}</h2>
  ) : (
    <div className='tableWrapper'>
      <Search
        boardData={searchTerm.length < 1 ? eBoardData.filterData : null}
        term={searchTerm}
        setTerm={setSearchTerm}
        searchKeyword={searchHandler}
      />
      <EditerTable
        eBoardData={currentData}
        userData={userData}
        board_type={board_type}
      />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={eBoardData.filterData.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Editer;
