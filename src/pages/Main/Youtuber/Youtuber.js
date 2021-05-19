import React, { useCallback, useEffect, useState } from "react";
import "./Youtuber.scss";
import { useDispatch, useSelector } from "react-redux";
import YoutuberTable from "./YoutuberTable";
import "./Youtuber.scss";
import { getYBoards, getFilterData, addLike, deleteLike } from "../../../redux/board/youtube/yboardReducer";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { AiFillYoutube } from "react-icons/ai";
import { ToastCenter } from "../../../modules/ToastModule";
// nav에서 유튜버를 누르면 보이는 전체 컴포넌트
const Youtuber = () => {
  const dispatch = useDispatch();
  // Youtuber의 전체 데이터 불러오기
  const yBoardData = useSelector((state) => state.YboardReducer);
  const { userData } = useSelector((state) => state.loginReducer);

  const [searchTerm, setSearchTerm] = useState("");

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

  const likeHandler = useCallback(
    (board_id) => {
      if (userData && userData.id) {
        deleteLike(board_id, userData.id).then((res) => {
          dispatch(res);
        });
      } else {
        ToastCenter("로그인 해주세요");
      }
    },
    [userData, dispatch]
  );
  const dislikeHandler = useCallback(
    (board_id) => {
      if (userData && userData.id) {
        addLike(board_id, userData.id).then((res) => {
          dispatch(res);
        });
      } else {
        ToastCenter("로그인 해주세요");
      }
    },
    [userData, dispatch]
  );

  return yBoardData.loading && !yBoardData ? (
    <div className='loading'></div>
  ) : yBoardData.err ? (
    <h2>{yBoardData.err}</h2>
  ) : (
    <div className='tableWrapper'>
      <div className='ListTitleWrapper'>
        <AiFillYoutube className='YoutubeIcons'></AiFillYoutube>
        <h1>Youtuber 공고 목록</h1>
      </div>
      <Search
        boardData={searchTerm.length < 1 ? yBoardData.filterData : null}
        term={searchTerm}
        setTerm={setSearchTerm}
        searchKeyword={searchHandler}
      />
      <YoutuberTable boardData={currentData} likeHandler={likeHandler} dislikeHandler={dislikeHandler} />
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
