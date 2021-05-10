import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sortLikes,
  sortExpiredDate,
} from '../../../redux/board/thumbnail/thboardReducer';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FcLike } from 'react-icons/fc';
import '../Youtuber/Ylist.scss';
export default function ThumbnailerTable({ boardData }) {
  const dispatch = useDispatch();
  const expiredData = useCallback(() => {
    sortExpiredDate().then((res) => {
      dispatch(res);
      console.log('마감순', res);
    });
  }, [boardData]);

  //인기순 정렬하기
  const likesData = useCallback(() => {
    sortLikes().then((res) => {
      dispatch(res);
      console.log('인기순', res);
    });
  }, [boardData]);

  return (
    <div className='card-container'>
      <div>
        {/* 
        검색:
        <input
          type='text'
          placeholder='유저, 제목, 툴 검색'
          onChange={(e) => {
            setSearchData(e.target.value);
          }}
        />
        */}
        <Link to='/Yregister'>등록하기</Link>
        <button onClick={expiredData}>마감일</button>
        <button onClick={likesData}>인기순</button>
      </div>
      {boardData?.map((data) => (
        <Card key={data.id}>
          <Card.Img src='/img/board_pic/editor_pic/thum2.png'></Card.Img>
          <Card.Header>
            <Card.Title>
              <Link to={`/YoutuberProfile/`} className='card-link'>
                {data.user.username}
              </Link>
              <Link to={`/Ydetail/${data.id}`} className='card-link'>
                {data.title}
              </Link>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {/* 기본값 중에서 경력, 급여 등의 중요내용 넣기 */}
            <Card.Text>
              {data.payType} : {data.payAmount}원
              <br />
              {data.worker}
              <br />
              tools: {data.tools[0]}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div>
              <span>
                <strong>수정일 </strong>
              </span>
              <strong>
                {format(new Date(data.updatedDate), 'yyyy-MM-dd')}
              </strong>
            </div>
            <div>
              <span>
                <strong>마감일 </strong>
              </span>
              <strong>
                {format(new Date(data.expiredDate), 'yyyy-MM-dd')}
              </strong>
            </div>
            <div className='card-like'>
              <FcLike size={20} /> {data.likes}
            </div>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
