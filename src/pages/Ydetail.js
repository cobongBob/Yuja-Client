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
          <tr>
            <td colSpan='4'>
              <h2>편집왕 구합니다!!!!</h2>
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>서연호</td>
            <td>YouTube 채널</td>
            <td>
              <a href='https://www.youtube.com/channel/UCVrhnbfe78ODeQglXtT1Elw'>
                채널 바로가기
              </a>
            </td>
          </tr>
          <tr>
            <td>모집조건</td>
            <td>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
            </td>
            <td>근무조건</td>
            <td>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
            </td>
          </tr>
          <tr>
            <td>원하는 편집 Tools</td>
            <td className='DetailHeaderTools' colSpan='3'>
              <input type='checkbox' id='python' />
              <label htmlFor='python'>파이썬</label>
              <input type='checkbox' id='java' />
              <label htmlFor='java'>JAVA</label>
              <input type='checkbox' id='javascripts' />
              <label htmlFor='javascripts'>JavaScripts</label>
              <input type='checkbox' id='react' />
              <label htmlFor='react'>React</label>
              <input type='checkbox' id='css' />
              <label htmlFor='css'>CSS</label>
              <input type='checkbox' id='view' />
              <label htmlFor='view'>View</label>
            </td>
          </tr>
        </table>
      </div>
      <div className='DetailBodyWrapper'>
        <div className='DetailBodyContents'>
          <div className='DetailBodyWrapperTitle'>
            <h2>내용</h2>
          </div>
          <div className='DetailBodyImg'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              pariatur voluptas tempore tenetur? Qui id quasi voluptatum ut
              recusandae minima delectus accusamus similique mollitia, aut
              tempora fugiat, non reprehenderit commodi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              pariatur voluptas tempore tenetur? Qui id quasi voluptatum ut
              recusandae minima delectus accusamus similique mollitia, aut
              tempora fugiat, non reprehenderit commodi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              pariatur voluptas tempore tenetur? Qui id quasi voluptatum ut
              recusandae minima delectus accusamus similique mollitia, aut
              tempora fugiat, non reprehenderit commodi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              pariatur voluptas tempore tenetur? Qui id quasi voluptatum ut
              recusandae minima delectus accusamus similique mollitia, aut
              tempora fugiat, non reprehenderit commodi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              pariatur voluptas tempore tenetur? Qui id quasi voluptatum ut
              recusandae minima delectus accusamus similique mollitia, aut
              tempora fugiat, non reprehenderit commodi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              pariatur voluptas tempore tenetur? Qui id quasi voluptatum ut
              recusandae minima delectus accusamus similique mollitia, aut
              tempora fugiat, non reprehenderit commodi.
            </p>
            <img src='../img/board_pic/editor_pic/thum1.PNG' />
            <p>링크자리? 미리보기? </p>
          </div>
        </div>
        <div>board_id</div>
        <div>update_date</div>
        <div>expired_Date</div>
        <div>career</div>
        <div>payAmount</div>
        <div>payType</div>
        <div>tools(여러개 체크 박스?)</div>
        <div>boardCode</div>
      </div>
    </div>
  );
};

export default Ydetail;
