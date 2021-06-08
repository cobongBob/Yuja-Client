import React from 'react';
import { useHistory } from 'react-router';
import Pagination from '../Main/components/Pagination';

const MyPageYoutuberTable = ({
  boardData,
  youtubeLikeHandler,
  boardPerPage,
  totalBoards,
  currentPage,
  clickPage,
}) => {
  const history = useHistory();

  return (
    boardData && (
      <div className='myPage-youtuberbox'>
        <h3 className='myPage-title'> 유튜버 공고 </h3>
        <table>
          <thead>
            <tr>
              <td>채널명</td>
              <td>제목</td>
              <td>경력</td>
              <td>담당자연락처</td>
              <td>모집분야</td>
              <td>사용기술</td>
              <td>마감일</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {boardData?.map((data, idx) => {
              return (
                <tr
                  key={idx}
                  onClick={() => history.push(`/Ydetail/${data.id}/1`)}
                >
                  <td>{data.channelName}</td>
                  <td>{data.title}</td>
                  <td>{data.career}</td>
                  <td>{data.receptionMethod}</td>
                  <td>{data.worker}</td>
                  <td>{data.tools && data.tools.join(', ')}</td>
                  {data.ywhen === '마감일' ? (
                    <td>{data.expiredDate.substr(0, 10)}</td>
                  ) : (
                    <td>{data.ywhen}</td>
                  )}
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => youtubeLikeHandler(data.id)}
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
        <div className='myPage-youtuber-paging'>
          <Pagination
            boardPerPage={boardPerPage}
            totalBoards={totalBoards}
            currentPage={currentPage}
            clickPage={clickPage}
          />
        </div>
      </div>
    )
  );
};

export default MyPageYoutuberTable;
