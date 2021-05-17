import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getWinBoard,
  getSearchData,
} from '../../../redux/board/winwin/winBoardReducer';
import './Winwin.scss';
import WinTable from './WinTable';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
const Winwin = ({ match }) => {
  const dispatch = useDispatch();
  const board_type = useRef(match.params.board_type);
  const { userData } = useSelector((state) => state.loginReducer);
  const winBoard = useSelector((state) => state.winBoardReducer);

  //검색
  const [searchTerm, setSearchTerm] = useState('');
  const searchHandler = (keyword) => {
    setSearchTerm(keyword);
    getSearchData(keyword).then((res) => {
      dispatch(res);
    });
  };

  //페이징
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(10);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = winBoard.wFilterData.slice(
    indexOfFirstData,
    indexOfLastData
  );
  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);

  useEffect(() => {
    board_type.current = match.params.board_type;
    dispatch(getWinBoard(board_type.current));
  }, [userData, dispatch, match.params.board_type]);
  return winBoard.loading ? (
    <h2>Loading...</h2>
  ) : winBoard.err ? (
    <h2>{winBoard.err}</h2>
  ) : (
    <div>
      <div className='sideMenu'>
        <h2>커뮤니티</h2>
        <br />
        <div>
          <Link to={`/Community/Winwin`}>윈윈</Link> <br />
          <Link to={`/Community/Collabo`}>합방해요</Link>
        </div>
      </div>
      <div className='table-Wrapper'>
        <WinTable
          currentData={currentData}
          board_type={board_type.current}
          lastIdx={winBoard.wFilterData.length - 10 * (currentPage - 1)}
        />
        <Search
          boardData={searchTerm.length < 1 ? winBoard.wFilterData : null}
          term={searchTerm}
          setTerm={setSearchTerm}
          searchKeyword={searchHandler}
        />
        <Pagination
          boardPerPage={boardPerPage}
          totalBoards={winBoard.wFilterData.length}
          currentPage={currentPage}
          clickPage={clickPage}
        />
      </div>
    </div>
  );
};

export default Winwin;
