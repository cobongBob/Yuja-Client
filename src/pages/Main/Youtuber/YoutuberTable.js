import React, { useCallback, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import '../Youtuber/Ylist.scss';
import SortingToDeadline from '../components/SortingToDeadline';
import SortingToLiked from '../components/SortingToLiked';
import BackToList from '../components/BackToList';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const YoutuberTable = ({ boardData, likeHandler, dislikeHandler }) => {
  const history = useHistory();
  return (
    <div className='card-container'>
      <div className='card-options'>
        <Link to='/Yregister' className='registerBtn'>
          공고 등록하기
        </Link>
      </div>
      <div className='card-options'>
        <BackToList />
        <SortingToDeadline boardData={boardData} />
        <SortingToLiked boardData={boardData} />
      </div>
      <ul>
        {boardData?.map((data) => (
          <li>
            <Card key={data.id}>
              <Card.Img
                className='Card-Img'
                onClick={() => history.push(`/Ydetail/${data.id}`)}
                src='/img/board_pic/thumbnailer_pic/thum3.PNG'></Card.Img>
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
                        className='starButton'>
                        <AiFillStar size={30} />
                        <span>{data.likes}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => dislikeHandler(data.id)}
                        className='starButton'>
                        <AiOutlineStar size={30} />
                        <span>{data.likes}</span>
                      </button>
                    )}
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <div>
                    <Link to={`/YoutuberProfile/`} className='card-link'>
                      {data.user.username}
                    </Link>
                  </div>
                  <div>
                    <Link to={`/Ydetail/${data.id}`} className='card-link'>
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
};
export default YoutuberTable;
