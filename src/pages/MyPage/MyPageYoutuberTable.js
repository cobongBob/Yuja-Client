import React from "react";
import { useHistory } from "react-router";

const MyPageYoutuberTable = ({ boardData, youtubeLikeHandler }) => {
  const history = useHistory();

  return (
    boardData && (
      <div className='myPage-youtuberbox'>
        <h3 className='myPage-title'> 유튜버 공고 </h3>
        <table>
          <thead>
            <tr>
              <td style={{ width: "4rem" }}>채널명</td>
              <td style={{ width: "7rem" }}>제목</td>
              <td style={{ width: "4rem" }}>지원자격</td>
              <td style={{ width: "7rem" }}>담당자연락처</td>
              <td style={{ width: "4rem" }}>모집분야</td>
              <td style={{ width: "7rem" }}>사용기술</td>
              <td style={{ width: "7rem" }}>마감일</td>
              <td style={{ width: "2rem" }}></td>
            </tr>
          </thead>
          <tbody>
            {boardData?.map((data, idx) => {
              return (
                <tr key={idx} onClick={() => history.push(`/Ydetail/${data.id}/1`)}>
                  <td style={{ width: "4rem" }}>{data.channelName}</td>
                  <td style={{ width: "4rem" }}>{data.title}</td>
                  <td style={{ width: "3rem" }}>{data.career}</td>
                  <td style={{ width: "4rem" }}>{data.receptionMethod}</td>
                  <td style={{ width: "4rem" }}>{data.worker}</td>
                  <td style={{ width: "3rem" }}>{data.tools && data.tools.join(", ")}</td>
                  {data.ywhen === "마감일" ? (
                    <td style={{ width: "4rem" }}>{data.expiredDate.substr(0, 10)}</td>
                  ) : (
                    <td style={{ width: "4rem" }}>{data.ywhen}</td>
                  )}
                  <td onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => youtubeLikeHandler(data.id)} className='myPage-cancel'>
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default MyPageYoutuberTable;
