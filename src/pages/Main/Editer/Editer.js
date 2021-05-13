import React, { useEffect, useState } from 'react';
import EditerTable from './EditerTable';
import '../Youtuber/Youtuber.scss';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  getData,
  getFilterData,
} from '../../../redux/board/editer/eboardReducer';
import Search from '../components/Search';

const Editor = () => {
  const dispatch = useDispatch();
  const { eBoardData, filterData } = useSelector(
    (state) => state.EboardReducer
  );
  const { userData } = useSelector((state) => state.loginReducer);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(12);

  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = filterData.slice(indexOfFirstData, indexOfLastData);

  const clickPage = (pages) => {
    setCurrentPage(pages);
  };

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
      <EditerTable boardData={currentData} userData={userData} />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={filterData.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Editor;
