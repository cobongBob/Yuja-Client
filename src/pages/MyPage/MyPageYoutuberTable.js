import React from 'react';

const MyPageYoutuberTable = ({ boardData, board_code }) => {
  return (
    <tbody className='myPage-box'>
      {boardData.data &&
        boardData.data?.map((data, idx) => {
          if (data.boardType.boardCode === board_code) {
            return (
              <tr key={idx}>
                {board_code !== Number(1) ? (
                  <td>{data.user.nickname}</td>
                ) : (
                  <td>{data.channelName}</td>
                )}
                <td>{data.title}</td>
                <td>{data.career}</td>
                <td>{data.receptionMethod}</td>
                {board_code !== Number(1) ? null : <td>{data.worker}</td>}
                <td>{data.tools}</td>
                {(board_code !== Number(1) && null) ||
                (board_code === Number(1) && data.ywhen === '') ? (
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
  );
};

export default MyPageYoutuberTable;
