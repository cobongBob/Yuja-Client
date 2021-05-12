import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FcLike } from 'react-icons/fc';
import '../Youtuber/Ylist.scss';
import SortingToDeadline from '../components/SortingToDeadline';
import SortingToLiked from '../components/SortingToLiked';

export default function YoutuberTable({ boardData }) {
  return (
    <div className='card-container'>
      <div className='card-options'>
        <div>
          <Link to='/Yregister'>등록하기</Link>
        </div>
        <SortingToDeadline boardData={boardData} />
        <SortingToLiked boardData={boardData} />
      </div>
      {boardData?.map((data) => (
        <Card key={data.id}>
          <Card.Img src='/img/board_pic/thumbnailer_pic/thum3.PNG'></Card.Img>
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
                <strong>마감일</strong>
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
