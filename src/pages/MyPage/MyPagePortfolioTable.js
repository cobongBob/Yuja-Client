import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteLike } from '../../redux/board/editer/eboardReducer';

const MyPageProfolioTable = ({ boardData, board_code, userData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const likeHandler = useCallback(
    (board_id) => {
      deleteLike(board_id, userData.id).then((res) => {
        dispatch(res);
      });
    },
    [userData, dispatch]
  );
  return (
    <div className='myPage-portfoliobox'>
      {board_code === 2 ? (
        <h3 className='myPage-title'>편집자 포트폴리오</h3>
      ) : (
        <h3 className='myPage-title'>썸네일러 포트폴리오</h3>
      )}
      <table>
        <thead>
          <th style={{ width: '4rem' }}>이름</th>
          <th style={{ width: '4rem' }}>제목</th>
          <th style={{ width: '4rem' }}>경력</th>
          <th style={{ width: '4rem' }}>연락처</th>
          <th style={{ width: '4rem' }}>사용기술</th>
          <th style={{ width: '2rem' }}></th>
        </thead>
        <tbody>
          {boardData.data &&
            boardData.data?.map((data, idx) => {
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
    </div>
  );
};

export default MyPageProfolioTable;
