import React, { useCallback, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FcLike } from 'react-icons/fc';
import '../Youtuber/Ylist.scss';
import SortingToDeadline from '../components/SortingToDeadline';
import SortingToLiked from '../components/SortingToLiked';
import BackToList from '../components/BackToList';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLike,
  deleteLike,
} from '../../../redux/board/youtube/yboardReducer';
import { AiOutlineHeart } from 'react-icons/ai';
import { userCheck } from '../../../redux/redux-login/loginReducer';
import * as auth from '../../../apiService/AuthenticationService';

const YoutuberTable = ({ boardData }) => {
  console.log(boardData);
  const { userData } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  // boardData.id를 하나하나 빼야하나..?
  // 현재 boardData는 12개를 다 담고있는 객체
  // 그러므로 내가 클릭한 list의 boardId가 필요하다..
  // 내가 클릭한 boardId....????????? 그럼 클릭한 boardId를 가져와야함
  const likeHandler = useCallback(
    (board_id) => {
      if (userData && userData.id) {
        if (boardData && boardData.liked) {
          deleteLike(board_id, userData.id).then((res) => {
            dispatch(res);
          });
        } else {
          addLike(board_id, userData.id).then((res) => {
            dispatch(res);
          });
        }
      }
    },
    [userData, dispatch, boardData]
  );
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
              <Card.Img src='/img/board_pic/thumbnailer_pic/thum3.PNG'></Card.Img>
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
                        className='likeButton'
                        onClick={likeHandler(data.id)}
                      >
                        <FcLike size={30} />
                        <span>{data.likes}</span>
                      </button>
                    ) : (
                      <button className='likeButton' onClick={likeHandler}>
                        <AiOutlineHeart size={30} />
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
