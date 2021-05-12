import React, { useCallback, useEffect, useState } from 'react';
import './Youtuber.scss';
import { useDispatch, useSelector } from 'react-redux';
import YoutuberTable from './YoutuberTable';
import './Youtuber.scss';
import {
  getData,
  getDetailData,
} from '../../../redux/board/youtube/yboardReducer';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
// nav에서 유튜버를 누르면 보이는 전체 컴포넌트
const Youtuber = () => {
  // Youtuber의 전체 데이터 불러오기
  const boardData = useSelector((state) => state.YboardReducer.data);
  const { userData } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  //페이징 처리하기
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(12);

  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = boardData.slice(indexOfFirstData, indexOfLastData);

  const clickPage = (pages) => {
    setCurrentPage(pages);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== '') {
      const newBoardList = boardData.filter((data) => {
        return Object.values(data.title)
          .join('')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newBoardList);
    } else {
      setSearchResults(boardData);
    }
  };

  // 전체 데이터 끌어오기
  useEffect(() => {
    if (userData.id) {
      getData(userData.id).then((res) => {
        dispatch(res);
      });
    } else {
      getData(0).then((res) => {
        dispatch(res);
      });
    }
  }, [userData]);

  return (
    <div className='tableWrapper'>
      <Search
        boardData={searchTerm.length < 1 ? boardData : searchResults}
        term={searchTerm}
        searchKeyword={searchHandler}
      />
      <YoutuberTable boardData={currentData} />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={boardData.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Youtuber;
