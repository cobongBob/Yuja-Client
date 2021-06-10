import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWinBoard, getSearchData } from "../../redux/board/winwin/winBoardReducer";
import "./Winwin.scss";
import WinTable from "./WinTable";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import WSide from "./WSide";
import { fetchAllNoticeBoards } from "../../apiService/AdminApiService";
const Winwin = ({ match, history }) => {
  const dispatch = useDispatch();
  const path = history.location.pathname;
  const lastPageNum = path.substr(path.lastIndexOf("/") + 1);
  const board_type = useRef(match.params.board_type);
  const pageNum = useRef(lastPageNum ? lastPageNum : 1);
  const { userData, authorities } = useSelector((state) => state.loginReducer);
  const winBoard = useSelector((state) => state.winBoardReducer);
  //검색
  const [searchTerm, setSearchTerm] = useState("");
  const searchHandler = (keyword) => {
    setSearchTerm(keyword);
    getSearchData(keyword).then((res) => {
      dispatch(res);
    });
  };

  //페이징
  const [currentPage, setCurrentPage] = useState(pageNum.current);
  const [boardPerPage] = useState(10);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = winBoard.wFilterData.slice(indexOfFirstData, indexOfLastData);
  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);

  useEffect(() => {
    board_type.current = match.params.board_type;
    dispatch(getWinBoard(board_type.current));
    setSearchTerm("");
  }, [userData, dispatch, match.params.board_type]);

  //공지 가져오기
  const [allNotices, setAllNotices] = useState([]);
  useEffect(() => {
    fetchAllNoticeBoards().then((res) => {
      setAllNotices(res.data);
    });
  }, []);

  return winBoard.loading && !winBoard ? (
    <div className='winwin-wrapper'>
      <div className='loading'>
        <WSide />
      </div>
    </div>
  ) : winBoard.err ? (
    <h2>{winBoard.err}</h2>
  ) : (
    <div className='winwin-wrapper'>
      <div className='sideBox'>
        <WSide />
      </div>
      <div className='winwinFrag'>
        <div className='winwin-Table-Wrapper'>
          <WinTable
            currentData={currentData}
            board_type={board_type.current}
            lastIdx={winBoard.wFilterData.length - 10 * (currentPage - 1)}
            currentPage={currentPage}
            allNotices={allNotices}
            userData={userData}
            authorities={authorities}
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
    </div>
  );
};

export default Winwin;
