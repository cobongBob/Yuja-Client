import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { wDeleteLike } from '../../redux/board/winwin/winBoardReducer';

const MyPageLikeWrite = ({ boardData, userData, freeLikeHandler }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <div className='myPage-freebox'>
        <h3 className='myPage-title'> 자유게시판 </h3>
        <table>
          <thead>
            <th style={{ width: '4rem' }}>분류</th>
            <th style={{ width: '4rem' }}>작성자</th>
            <th style={{ width: '7rem' }}>제목</th>
            <th style={{ width: '2rem' }}></th>
          </thead>
          <tbody>
            {boardData?.map((data, idx) => {
              if (
                data.boardType.boardCode === 4 ||
                data.boardType.boardCode === 5 ||
                data.boardType.boardCode === 6 ||
                data.boardType.boardCode === 7
              ) {
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
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPageLikeWrite;
