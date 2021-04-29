import React, { useEffect, useState } from 'react';
import YapiService from './YapiService';
import '../components/scss/Ydetail.scss';
import { FcLike, FcOk } from 'react-icons/fc';
import Footer from '../components/Footer';

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
    <div>
      <div className='DetailWrapper'>
        <div className='DetailHeaderWrapper'>
          <div className='DetailTop'>공고내용</div>
          <div></div>
          <div className='detail-title'>
            여기에 글 제목 넣을거임
            <div className='detail-show'>
              <p>
                <FcLike size={20} /> 15
              </p>
              <p>
                <FcOk size={20} /> 113
              </p>
            </div>
          </div>
          <div className='detail-date'>수정일 - 마감일</div>
          <div className='detail-content'>
            <p>여기에 모집내용 들어감</p>
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
          </div>
          <div className='youtube-top'>채널소개</div>
        </div>
        <div></div>
        <div className='channel-box'></div>
      </div>
      <Footer />
    </div>
  );
};

export default Ydetail;
