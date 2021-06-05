import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteLike } from '../../redux/board/youtube/yboardReducer';
import MyPagePagination from './MyPagePagination';

const MyPageYoutuberTable = ({ boardData, board_code, userData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const likeHandler = useCallback(
    (board_id) => {
      deleteLike(board_id, userData.id).then((res) => {
        dispatch(res);
      });
    },
    [userData, dispatch, MyPageYoutuberTable]
  );
  return (
    <div className='myPage-youtuberbox'>
      <h3 className='myPage-title'> 유튜버 공고 </h3>
      <table>
        <thead>
          <th style={{ width: '4rem' }}>채널명</th>
          <th style={{ width: '7rem' }}>제목</th>
          <th style={{ width: '4rem' }}>지원자격</th>
          <th style={{ width: '7rem' }}>담당자연락처</th>
          <th style={{ width: '4rem' }}>모집분야</th>
          <th style={{ width: '7rem' }}>사용기술</th>
          <th style={{ width: '7rem' }}>마감일</th>
          <th style={{ width: '2rem' }}></th>
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
                    <td style={{ width: '4rem' }}>{data.channelName}</td>
                    <td style={{ width: '4rem' }}>{data.title}</td>
                    <td style={{ width: '3rem' }}>{data.career}</td>
                    <td style={{ width: '4rem' }}>{data.receptionMethod}</td>
                    <td style={{ width: '4rem' }}>{data.worker}</td>
                    <td style={{ width: '3rem' }}>
                      {data.tools && data.tools.join(', ')}
                    </td>
                    {data.ywhen === '마감일' ? (
                      <td style={{ width: '4rem' }}>
                        {data.expiredDate.substr(0, 10)}
                      </td>
                    ) : (
                      <td style={{ width: '4rem' }}>{data.ywhen}</td>
                    )}
                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => likeHandler(data.id)}
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
      {/* <MyPagePagination boardPerPage={boardPerPage} currentPage={currentPage} /> */}
    </div>
  );
};

export default MyPageYoutuberTable;
