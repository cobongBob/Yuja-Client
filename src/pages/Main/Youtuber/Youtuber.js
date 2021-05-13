import React, { useCallback, useEffect, useState } from 'react';
import './Youtuber.scss';
import { useDispatch, useSelector } from 'react-redux';
import YoutuberTable from './YoutuberTable';
import './Youtuber.scss';
import {
  getData,
  getFilterData,
} from '../../../redux/board/youtube/yboardReducer';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import BackToList from '../components/BackToList';
// nav에서 유튜버를 누르면 보이는 전체 컴포넌트
const Youtuber = () => {
  const dispatch = useDispatch();
  // Youtuber의 전체 데이터 불러오기
  const { yBoardData, filterData } = useSelector(
    (state) => state.YboardReducer
  );
  const { userData } = useSelector((state) => state.loginReducer);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  //페이징 처리하기
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(12);

  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = filterData.slice(indexOfFirstData, indexOfLastData);

  const clickPage = (pages) => {
    setCurrentPage(pages);
  };

  // 전체 데이터 끌어오기
  useEffect(() => {
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

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    getFilterData(searchTerm).then((res) => {
      dispatch(res);
    });
  };

  return (
    <div className='tableWrapper'>
      <Search
        boardData={searchTerm.length < 1 ? filterData : searchResults}
        term={searchTerm}
        setTerm={setSearchTerm}
        searchKeyword={searchHandler}
      />
      <YoutuberTable boardData={currentData} />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={filterData.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Youtuber;
