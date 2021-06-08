import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLike } from '../../redux/board/youtube/yboardReducer';
import * as eboardReducer from '../../redux/board/editer/eboardReducer';
import './myPage.scss';
import MyPageLikeWrite from './MyPageLikeWrite';
import MyPagePortfolioTable from './MyPagePortfolioTable';
import MyPageYoutuberTable from './MyPageYoutuberTable';
import { wDeleteLike } from '../../redux/board/winwin/winBoardReducer';

const MyPageTable = ({
  youtubeLikeList,
  setYoutubeList,
  editorLikeList,
  setEditorLikeList,
  thumbLikeList,
  setThumbLikeList,
  freeLikeList,
  setFreeLikeList,
  userData,
}) => {
  const dispatch = useDispatch();
  const [boardPerPage] = useState(10);

  const [youtuberCurrentPage, setYoutuberCurrentPage] = useState(1);
  const yIndexOfLastData = youtuberCurrentPage * boardPerPage;
  const yIndexOfFirstData = yIndexOfLastData - boardPerPage;
  const yCurrentData = youtubeLikeList.slice(
    yIndexOfFirstData,
    yIndexOfLastData
  );
  const yClickPage = useCallback((pages) => {
    setYoutuberCurrentPage(pages);
  }, []);

  const [editorCurrentPage, setEditorCurrentPage] = useState(1);
  const eIndexOfLastData = editorCurrentPage * boardPerPage;
  const eIndexOfFirstData = eIndexOfLastData - boardPerPage;
  const eCurrentData = editorLikeList.slice(
    eIndexOfFirstData,
    eIndexOfLastData
  );
  const eClickPage = useCallback((pages) => {
    setEditorCurrentPage(pages);
  }, []);

  const [thumbCurrentPage, setThumbCurrentPage] = useState(1);
  const thIndexOfLastData = thumbCurrentPage * boardPerPage;
  const thIndexOfFirstData = thIndexOfLastData - boardPerPage;
  const thCurrentData = thumbLikeList.slice(
    thIndexOfFirstData,
    thIndexOfLastData
  );
  const thClickPage = useCallback((pages) => {
    setThumbCurrentPage(pages);
  }, []);

  const [freeCurrentPage, setFreeCurrentPage] = useState(1);
  const fIndexOfLastData = freeCurrentPage * boardPerPage;
  const fIndexOfFirstData = fIndexOfLastData - boardPerPage;
  const fCurrentData = freeLikeList.slice(fIndexOfFirstData, fIndexOfLastData);
  const fClickPage = useCallback((pages) => {
    setFreeCurrentPage(pages);
  }, []);

  const youtubeLikeHandler = useCallback(
    (board_id) => {
      deleteLike(board_id, userData.id).then((res) => {
        dispatch(res);
        setYoutubeList(
          youtubeLikeList.filter((data) => {
            return data.id !== board_id;
          })
        );
      });
    },
    [userData, dispatch, youtubeLikeList, setYoutubeList]
  );

  const portFolioLikeHandler = useCallback(
    (board_id, boardCode) => {
      eboardReducer.deleteLike(board_id, userData.id).then((res) => {
        dispatch(res);
        if (boardCode === 2) {
          setEditorLikeList(
            editorLikeList.filter((data) => {
              return data.id !== board_id;
            })
          );
        } else {
          setThumbLikeList(
            thumbLikeList.filter((data) => {
              return data.id !== board_id;
            })
          );
        }
      });
    },
    [
      userData,
      dispatch,
      editorLikeList,
      thumbLikeList,
      setEditorLikeList,
      setThumbLikeList,
    ]
  );

  const freeLikeHandler = useCallback(
    (board_id) => {
      wDeleteLike(board_id, userData.id).then((res) => {
        dispatch(res);
        setFreeLikeList(
          freeLikeList.filter((data) => {
            return data.id !== board_id;
          })
        );
      });
    },
    [userData, dispatch, freeLikeList, setFreeLikeList]
  );

  return (
    <div className='myPage-tableWrapper'>
      <span className='myPage-main-title'>즐겨찾기 목록</span>
      <div className='myPage-tableBox'>
        <MyPageYoutuberTable
          boardData={yCurrentData}
          youtubeLikeHandler={youtubeLikeHandler}
          boardPerPage={boardPerPage}
          totalBoards={youtubeLikeList.length}
          currentPage={youtuberCurrentPage}
          clickPage={yClickPage}
        />

        <MyPageLikeWrite
          boardData={fCurrentData}
          freeLikeHandler={freeLikeHandler}
          boardPerPage={boardPerPage}
          totalBoards={freeLikeList.length}
          currentPage={freeCurrentPage}
          clickPage={fClickPage}
        />
      </div>
      <div className='myPage-tableBox'>
        <MyPagePortfolioTable
          boardData={eCurrentData}
          board_code={2}
          portFolioLikeHandler={portFolioLikeHandler}
          boardPerPage={boardPerPage}
          totalBoards={editorLikeList.length}
          currentPage={editorCurrentPage}
          clickPage={eClickPage}
        />
        <MyPagePortfolioTable
          boardData={thCurrentData}
          board_code={3}
          portFolioLikeHandler={portFolioLikeHandler}
          boardPerPage={boardPerPage}
          thTotalBoards={thumbLikeList.length}
          thCurrentPage={thumbCurrentPage}
          thClickPage={thClickPage}
        />
      </div>
    </div>
  );
};

export default MyPageTable;
