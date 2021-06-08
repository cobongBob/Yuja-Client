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
            <td style={{ width: '2rem' }}>분류</td>
            <td style={{ width: '3rem' }}>작성자</td>
            <td style={{ width: '5rem' }}>제목</td>
            <td style={{ width: '2rem' }}></td>
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
      <Pagination
        boardPerPage={boardPerPage}
        totalBoards={totalBoards}
        currentPage={currentPage}
        clickPage={clickPage}
      />
    </div>
  );
};

export default MyPageLikeWrite;
