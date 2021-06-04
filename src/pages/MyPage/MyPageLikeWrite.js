import React from 'react';

const MyPageLikeWrite = (boardData) => {
  return (
    <div>
      <div className='myPage-freebox'>
        <h3 className='myPage-title'> 자유게시판 </h3>
        <table>
          <thead>
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
                    <tr key={idx}>
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
