import React, { useEffect, useState } from 'react';
import EditerTable from './EditerTable';
import '../Youtuber/Youtuber.scss';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEBoards,
  getFilterData,
} from '../../../redux/board/editer/eboardReducer';
import Search from '../components/Search';

const Editor = () => {
  const dispatch = useDispatch();

  // Youtuber의 전체 데이터 불러오기
  const eBoardData = useSelector((state) => state.EboardReducer);
  const { userData } = useSelector((state) => state.loginReducer);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    if (!userData || userData !== '') {
      dispatch(getEBoards(0, 3));
    } else {
      dispatch(getEBoards(userData.id, 3));
    }
  }, [userData, dispatch]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    getFilterData(searchTerm).then((res) => {
      dispatch(res);
    });
  };

  return eBoardData.loading ? (
    <h2>Loading...</h2>
  ) : eBoardData.err ? (
    <h2>{eBoardData.err}</h2>
  ) : (
    <div className='tableWrapper'>
      <Search
        boardData={
          searchTerm.length < 1 ? eBoardData.filterData : searchResults
        }
        term={searchTerm}
        setTerm={setSearchTerm}
        searchKeyword={searchHandler}
      />
      <EditerTable boardData={currentData} userData={userData} />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={eBoardData.filterData.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Editor;
