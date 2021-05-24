import React, { useCallback, useEffect, useRef, useState } from "react";
import EditerTable from "./EditerTable";
import "../Youtuber/Youtuber.scss";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteLike, getEBoards, getFilterData } from "../../../redux/board/editer/eboardReducer";
import Search from "../components/Search";
import { ToastCenter } from "../../../modules/ToastModule";
import { RiScissorsCutFill } from "react-icons/ri";

const Editer = ({ match, history }) => {
  const dispatch = useDispatch();

  // Youtuber의 전체 데이터 불러오기
  const eBoardData = useSelector((state) => state.EboardReducer);
  const { userData } = useSelector((state) => state.loginReducer);
  const board_type = useRef(match.params.board_type);
  const path = history.location.pathname;
  const lastPageNum = path.substr(path.lastIndexOf("/") + 1);
  const pageNum = useRef(lastPageNum ? lastPageNum : 1);

  const [searchTerm, setSearchTerm] = useState("");
  const searchHandler = (keyword) => {
    setSearchTerm(keyword);
    getFilterData(keyword).then((res) => {
      dispatch(res);
    });
  };

  const [currentPage, setCurrentPage] = useState(pageNum.current);
  const [boardPerPage] = useState(12);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = eBoardData.filterData.slice(indexOfFirstData, indexOfLastData);

  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);

  useEffect(() => {
    board_type.current = match.params.board_type;
    dispatch(getEBoards(board_type.current));
  }, [userData, dispatch, match.params.board_type]);

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

  return eBoardData.loading && !eBoardData ? (
    <div className='loading'></div>
  ) : eBoardData.err ? (
    <h2>{eBoardData.err}</h2>
  ) : (
    <div className='tableWrapper'>
      <div className='EListTitleWrapper'>
        <RiScissorsCutFill className='EditorIcons'></RiScissorsCutFill>
        <h1>편집자 포트폴리오</h1>
      </div>
      <Search
        boardData={searchTerm.length < 1 ? eBoardData.filterData : null}
        term={searchTerm}
        setTerm={setSearchTerm}
        searchKeyword={searchHandler}
      />
      <EditerTable
        eBoardData={currentData}
        userData={userData}
        board_type={board_type.current}
        currentPage={currentPage}
        likeHandler={likeHandler}
        dislikeHandler={dislikeHandler}
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
