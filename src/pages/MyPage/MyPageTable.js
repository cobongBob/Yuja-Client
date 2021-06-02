import React from 'react';
import './myPage.scss';
import MyPageTableBody from './MyPageTableBody';

const MyPageTable = ({ boardData }) => {
  console.log(1111, boardData);
  return (
    <div className='tableWrapper'>
      <span className='beforeModifyTitle'>즐겨찾기 목록 </span>
      <h3 style={{ fontFamily: 'hopang', color: '#ffb963' }}> 유튜버 공고 </h3>
      <table className='myPage-box '>
        <thead>
          <th>채널명</th>
          <th>제목</th>
          <th>지원자격</th>
          <th>담당자연락처</th>
          <th>모집분야</th>
          <th>사용기술</th>
          <th>마감일</th>
        </thead>
        <MyPageTableBody boardData={boardData} board_code={1} />
      </table>
      <h3> 편집자 포트폴리오 </h3>
      <table className='myPage-box'>
        <thead>
          <th>이름</th>
          <th>제목</th>
          <th>경력</th>
          <th>연락처</th>
          <th>사용기술</th>
        </thead>
        <MyPageTableBody boardData={boardData} board_code={2} />
      </table>
      <h3> 썸네일러 포트폴리오 </h3>
      <table className='myPage-box'>
        <thead>
          <th>이름</th>
          <th>제목</th>
          <th>경력</th>
          <th>연락처</th>
          <th>사용기술</th>
        </thead>
        <MyPageTableBody boardData={boardData} board_code={3} />
      </table>
      <h3> 자유게시판 </h3>
      <table className='myPage-box'>
        <thead>
          <th>이름</th>
          <th>제목</th>
          <th>경력</th>
          <th>연락처</th>
          <th>사용기술</th>
        </thead>
        <MyPageTableBody boardData={boardData} board_code={4} />
      </table>
    </div>
  );
};

export default MyPageTable;
