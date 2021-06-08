import React from 'react';
import { useHistory } from 'react-router';
import Pagination from '../Main/components/Pagination';

const MyPageProfolioTable = ({
  boardData,
  board_code,
  portFolioLikeHandler,
  boardPerPage,
  totalBoards,
  currentPage,
  clickPage,
  thTotalBoards,
  thCurrentPage,
  thClickPage,
}) => {
  const history = useHistory();

  return (
    <div className='myPage-portfoliobox'>
      {board_code === 2 ? (
        <h3 className='myPage-title'>편집자 포트폴리오</h3>
      ) : (
        <h3 className='myPage-title'>썸네일러 포트폴리오</h3>
      )}
      <table>
        <thead>
          <tr>
            <td>이름</td>
            <td>제목</td>
            <td>경력</td>
            <td>연락처</td>
            <td>사용기술</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {boardData?.map((data, idx) => {
            if (data.boardType.boardCode === board_code) {
              return (
                <tr
                  key={idx}
                  onClick={() =>
                    history.push(
                      `/${board_code === 2 ? 'EDetail' : 'ThumbDetail'}/${
                        board_code === 2 ? 'Editor' : 'Thumb'
                      }/${data.id}/1`
                    )
                  }
                >
                  <td>{data.user.nickname}</td>
                  <td>{data.title}</td>
                  <td>{data.career}</td>
                  <td>{data.receptionMethod}</td>
                  <td>{data.tools && data.tools.join(', ')}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => portFolioLikeHandler(data.id, board_code)}
                      className='myPage-cancel'
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <div className='myPage-portfolio-paging'>
        {board_code === 2 ? (
          <Pagination
            boardPerPage={boardPerPage}
            totalBoards={totalBoards}
            currentPage={currentPage}
            clickPage={clickPage}
          />
        ) : (
          <Pagination
            boardPerPage={boardPerPage}
            totalBoards={thTotalBoards}
            currentPage={thCurrentPage}
            clickPage={thClickPage}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageProfolioTable;
