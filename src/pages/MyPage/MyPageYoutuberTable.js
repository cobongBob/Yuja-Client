import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Pagination from '../Main/components/Pagination';

const MyPageYoutuberTable = ({ boardData, board_code }) => {
  const history = useHistory();
  const path = history.location.pathname;
  const lastPageNum = path.substr(path.lastIndexOf('/') + 1);
  const pageNum = useRef(lastPageNum ? lastPageNum : 1);
  const [currentPage, setCurrentPage] = useState(pageNum.current);
  const [boardPerPage] = useState(5);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;
  const clickPage = useCallback((pages) => {
    setCurrentPage(pages);
  }, []);
  return (
    <div>
      <div className='myPage-youtuberbox'>
        <h3 className='myPage-title'> 유튜버 공고 </h3>
        <table>
          <thead>
            <th>채널명</th>
            <th>제목</th>
            <th>지원자격</th>
            <th>담당자연락처</th>
            <th>모집분야</th>
            <th>사용기술</th>
            <th>마감일</th>
          </thead>
          <tbody>
            {boardData.data &&
              boardData.data?.map((data, idx) => {
                if (data.boardType.boardCode === board_code) {
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
                        <td> {data.ywhen}</td>
                      )}
                    </tr>
                  );
                }
                return null;
              })}
          </tbody>
        </table>
        <Pagination
          boardPerPage={boardPerPage}
          currentPage={currentPage}
          clickPage={clickPage}
        />
      </div>
    </div>
  );
};

export default MyPageYoutuberTable;
