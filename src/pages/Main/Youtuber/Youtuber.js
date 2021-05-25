import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Youtuber.scss';
import { useDispatch, useSelector } from 'react-redux';
import YoutuberTable from './YoutuberTable';
import './Youtuber.scss';
import {
  getYBoards,
  getFilterData,
  addLike,
  deleteLike,
} from '../../../redux/board/youtube/yboardReducer';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import { AiFillYoutube } from 'react-icons/ai';
import { ToastCenter } from '../../../modules/ToastModule';
// nav에서 유튜버를 누르면 보이는 전체 컴포넌트
const Youtuber = ({ match }) => {
  const dispatch = useDispatch();
  // Youtuber의 전체 데이터 불러오기
  const yBoardData = useSelector((state) => state.YboardReducer);
  const { userData } = useSelector((state) => state.loginReducer);
  const { authorities } = useSelector((state) => state.loginReducer);
  const [searchTerm, setSearchTerm] = useState('');
  const board_type = useRef('Youtuber');
  //페이징 처리하기
  const [currentPage, setCurrentPage] = useState(match.params.current_page);
  const [boardPerPage] = useState(12);

  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const currentData = yBoardData.filterData.slice(
    indexOfFirstData,
    indexOfLastData
  );

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
      if (
        (userData &&
          userData.id &&
          authorities &&
          authorities.includes('YOUTUBER')) ||
        authorities.includes('EDITOR') ||
        authorities.includes('THUMBNAILER') ||
        authorities.includes('ADMIN')
      ) {
        deleteLike(board_id, userData.id).then((res) => {
          dispatch(res);
        });
      } else {
        ToastCenter('로그인 해주세요');
      }
    },
    [userData, dispatch]
  );
  const dislikeHandler = useCallback(
    (board_id) => {
      if (
        (userData &&
          userData.id &&
          authorities &&
          authorities.includes('YOUTUBER')) ||
        authorities.includes('EDITOR') ||
        authorities.includes('THUMBNAILER') ||
        authorities.includes('ADMIN')
      ) {
        addLike(board_id, userData.id).then((res) => {
          dispatch(res);
        });
      } else {
        ToastCenter('권한이 없습니다.');
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
      <div className='YListTitleWrapper'>
        <AiFillYoutube className='YoutubeIcons'></AiFillYoutube>
        <h1>Youtuber 공고 목록</h1>
      </div>
      <Search
        boardData={searchTerm.length < 1 ? yBoardData.filterData : null}
        term={searchTerm}
        setTerm={setSearchTerm}
        searchKeyword={searchHandler}
      />
      <YoutuberTable
        boardData={currentData}
        likeHandler={likeHandler}
        dislikeHandler={dislikeHandler}
        currentPage={currentPage}
        board_type={board_type.current}
      />
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
