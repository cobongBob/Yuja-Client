import React from 'react';

const MyPageProfolioTable = ({ boardData, board_code }) => {
  return (
    <div className='myPage-portfoliobox'>
      {board_code === 2 ? (
        <h3 className='myPage-title'>편집자 포트폴리오</h3>
      ) : (
        <h3 className='myPage-title'>썸네일러 포트폴리오</h3>
      )}
      <table>
        <thead>
          <th>이름</th>
          <th>제목</th>
          <th>경력</th>
          <th>연락처</th>
          <th>사용기술</th>
        </thead>
        <tbody>
          {boardData.data &&
            boardData.data?.map((data, idx) => {
              if (data.boardType.boardCode === board_code) {
                return (
                  <tr key={idx}>
                    <td>{data.user.nickname}</td>
                    <td>{data.title}</td>
                    <td>{data.career}</td>
                    <td>{data.receptionMethod}</td>
                    <td>{data.tools && data.tools.join(', ')}</td>
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
