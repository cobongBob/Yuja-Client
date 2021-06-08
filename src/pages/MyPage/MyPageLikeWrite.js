import React from 'react';
import { useHistory } from 'react-router';
import Pagination from '../Main/components/Pagination';

const MyPageLikeWrite = ({
  boardData,
  freeLikeHandler,
  boardPerPage,
  totalBoards,
  currentPage,
  clickPage,
}) => {
  const history = useHistory();

  return (
    <div className='myPage-freebox'>
      <h3 className='myPage-title'> 자유게시판 </h3>
      <table>
        <thead>
          <tr>
            <td>분류</td>
            <td>작성자</td>
            <td>제목</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {boardData?.map((data, idx) => {
            return (
              <tr
                key={idx}
                onClick={() =>
                  history.push(
                    `/BoardDetail/${
                      (data.boardType.boardCode === 4 && 'Winwin') ||
                      (data.boardType.boardCode === 5 && 'Collabo') ||
                      (data.boardType.boardCode === 6 && 'Free') ||
                      (data.boardType.boardCode === 7 && 'CustomService')
                    }/${data.id}/1`
                  )
                }
              >
                <td>
                  {(data.boardType.boardCode === 4 && '성장') ||
                    (data.boardType.boardCode === 5 && '합방') ||
                    (data.boardType.boardCode === 6 && '자유') ||
                    (data.boardType.boardCode === 7 && '건의')}
                </td>
                <td>{data.user.nickname}</td>
                <td>{data.title}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => freeLikeHandler(data.id)}
                    className='myPage-cancel'
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='myPage-free-paging'>
        <Pagination
          boardPerPage={boardPerPage}
          totalBoards={totalBoards}
          currentPage={currentPage}
          clickPage={clickPage}
        />
      </div>
    </div>
  );
};

export default MyPageLikeWrite;
