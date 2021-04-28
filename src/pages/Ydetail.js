import React, { useEffect, useState } from 'react';
import YapiService from './YapiService';
import '../components/scss/Ydetail.scss';

const Ydetail = (props) => {
  console.log(props.match.params.board_id);
  useEffect(() => {
    YapiService.fetchUsers(props.match.params.board_id).then((res) => {
      console.log(res.data.title);
      console.log(res.data.content);
      console.log(res.data.thumbnail);
    });
  }, []);
  return (
    <div className='DetailWrapper'>
      <div className='DetailHeaderWrapper'>
        <h1>상세보기</h1>
        <table>
          <tr>
            <td>글번호</td>
            <td>수정일</td>
            <td>마감일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2021/04/28</td>
            <td>2021/06/23</td>
            <td>33</td>
          </tr>
        </table>
        <h2>편집왕 구합니다!!!</h2>
        <li>작성자: 서연호</li>
        <div>
          <img src='' alt='' />
        </div>
        <div>board_id</div>
        <div>create_date</div>
        <div>update_date</div>
        <div>expired_Date</div>
        <div>hit(조회수)</div>
      </div>
      <div className='DetailBodyWrapper'>
        <div>title</div>
        <div>user_id</div>
        <div>thumbnail</div>
        <div>career</div>
        <div>content</div>
        <div>payAmount</div>
        <div>payType</div>
        <div>tools(여러개 체크 박스?)</div>
        <div>boardCode</div>
      </div>
    </div>
  );
};

export default Ydetail;
