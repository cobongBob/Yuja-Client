import React from 'react';
import { useHistory } from 'react-router';

const MyPageLikeWrite = ({ boardData }) => {
  const history = useHistory();

  return (
    <div>
      <div className='myPage-freebox'>
        <h3 className='myPage-title'> 자유게시판 </h3>
        <table>
          <thead>
            <th>분류</th>
            <th>작성자</th>
            <th>제목</th>
          </thead>
          <tbody>
            {boardData.data &&
              boardData.data?.map((data, idx) => {
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
