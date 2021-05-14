import React, { useEffect, useState } from "react";
import "./Youtuber.scss";
import { useDispatch, useSelector } from "react-redux";
import YoutuberTable from "./YoutuberTable";
import "./Youtuber.scss";
import { getYBoards, getFilterData } from "../../../redux/board/youtube/yboardReducer";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
// nav에서 유튜버를 누르면 보이는 전체 컴포넌트
const Youtuber = () => {
  const dispatch = useDispatch();
  // Youtuber의 전체 데이터 불러오기
  const yBoardData = useSelector((state) => state.YboardReducer);
  const { userData } = useSelector((state) => state.loginReducer);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //페이징 처리하기
  const [currentPage, setCurrentPage] = useState(1);
  const [boardPerPage] = useState(12);

  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = yBoardData.filterData.slice(indexOfFirstData, indexOfLastData);

  const clickPage = (pages) => {
    setCurrentPage(pages);
  };

  // 전체 데이터 끌어오기
  useEffect(() => {
    dispatch(getYBoards());
  }, [userData, dispatch]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    getFilterData(searchTerm).then((res) => {
      dispatch(res);
    });
  };

  return yBoardData.loading ? (
    <h2>Loading...</h2>
  ) : yBoardData.err ? (
    <h2>{yBoardData.err}</h2>
  ) : (
    <div className='tableWrapper'>
      <Search
        boardData={searchTerm.length < 1 ? yBoardData.filterData : searchResults}
        term={searchTerm}
        setTerm={setSearchTerm}
        searchKeyword={searchHandler}
      />
      <YoutuberTable boardData={currentData} />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={yBoardData.filterData.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Youtuber;
