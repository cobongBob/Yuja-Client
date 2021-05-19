import React, { useEffect, useRef, useState } from "react";
import ThumbnailerTable from "./ThumbnailerTable";
import "../Youtuber/Youtuber.scss";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import { getEBoards, getFilterData } from "../../../redux/board/editer/eboardReducer";

// nav에서 썸네일러를 누르면 보이는 전체 컴포넌트
const Thumbnailer = ({ match, history }) => {
  const dispatch = useDispatch();

  // Youtuber의 전체 데이터 불러오기
  const thBoardData = useSelector((state) => state.EboardReducer);
  const { userData } = useSelector((state) => state.loginReducer);
  const board_type = useRef(match.params.board_type);
  const path = history.location.pathname;
  const lastPageNum = path.substr(path.lastIndexOf("/") + 1);
  const pageNum = useRef(lastPageNum ? lastPageNum : 1);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(pageNum.current);
  const [boardPerPage] = useState(12);

  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = thBoardData.filterData.slice(indexOfFirstData, indexOfLastData);

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

  return thBoardData.loading && !thBoardData ? (
    <div className='loading'></div>
  ) : thBoardData.err ? (
    <h2>{thBoardData.err}</h2>
  ) : (
    <div className='tableWrapper'>
      <Search
        boardData={searchTerm.length < 1 ? thBoardData.filterData : null}
        term={searchTerm}
        setTerm={setSearchTerm}
        searchKeyword={searchHandler}
      />
      <ThumbnailerTable
        boardData={currentData}
        userData={userData}
        board_type={board_type.current}
        currentPage={currentPage}
      />
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={thBoardData.filterData.length}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default Thumbnailer;
