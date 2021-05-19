import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { FcLike } from 'react-icons/fc';
import '../Youtuber/Ylist.scss';
import BackToList from '../components/BackToList';
import SortingToDeadline from '../components/SortingToDeadline';
import SortingToLiked from '../components/SortingToLiked';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function EditorTable({
  eBoardData,
  likeHandler,
  dislikeHandler,
}) {
  const history = useHistory();
  return (
    <div className='card-container'>
      <div className='card-options'>
        <Link to='/EditorRegister' className='registerBtn'>
          이력서 등록하기
        </Link>
      </div>
      <div className='card-options'>
        <BackToList />
        <SortingToDeadline boardData={eBoardData} />
        <SortingToLiked boardData={eBoardData} />
      </div>
      <ul>
        {eBoardData?.map((data) => (
          <li>
            <Card key={data.id}>
              <Card.Img
                className='Card-Img'
                onClick={() => history.push(`/EDetail/${data.id}`)}
                src='/img/board_pic/thumbnailer_pic/thum2.PNG'
              ></Card.Img>
              <Card.Header>
                <Card.Title>
                  <div>
                    {data.payType} {data.payAmount}원
                  </div>
                  <div> 사용기술 {data.tools[0]} </div>
                  <div> 모집분야 {data.worker} </div>
                  <div className='card-deadline'>
                    <span>마감일 </span>
                    {format(new Date(data.expiredDate), 'yyyy-MM-dd')}
                  </div>
                  <div className='card-like'>
                    {data && data.liked ? (
                      <button
                        onClick={() => likeHandler(data.id)}
                        className='starButton'
                      >
                        <AiFillStar size={30} />
                        <span>{data.likes}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => dislikeHandler(data.id)}
                        className='starButton'
                      >
                        <AiOutlineStar size={30} />
                        <span>{data.likes}</span>
                      </button>
                    )}
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <div>{data.user.username}</div>
                  <div>
                    <Link to={`/EDetail/${data.id}`} className='card-link'>
                      {data.title}
                    </Link>
                  </div>
                </Card.Text>
                <Card.Footer>
                  <div>
                    <strong>
                      <span>수정일 </span>
                      {format(new Date(data.updatedDate), 'yyyy-MM-dd')}
                    </strong>
                  </div>
                </Card.Footer>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
