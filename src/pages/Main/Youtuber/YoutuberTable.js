import React, { useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import '../Youtuber/Ylist.scss';
import SortingToDeadline from '../components/SortingToDeadline';
import SortingToLiked from '../components/SortingToLiked';
import BackToList from '../components/BackToList';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ToastAlertNoDupl, ToastCenter } from '../../../modules/ToastModule';

const YoutuberTable = ({
  boardData,
  likeHandler,
  dislikeHandler,
  currentPage,
  board_type,
  wrote,
  userData,
}) => {
  const history = useHistory();
  const writeBoard = useCallback(() => {
    if (userData && userData.id > 0) {
      history.push('/YoutuberRegister');
    } else {
      ToastCenter(`로그인 해주세요`);
    }
  }, [userData, history]);
  return (
    <div className='card-container'>
      <div className='card-options'>
        {wrote.length < 3 ? (
          <button onClick={writeBoard} className='registerBtn'>
            공고 등록하기
          </button>
        ) : (
          <button
            onClick={() => {
              ToastAlertNoDupl(
                `공고가 3개 이상있어 새로 글 작성시 가장 오래된 공고 1개가 삭제됩니다.`
              );
              writeBoard();
            }}
            className='registerBtn'>
            공고 등록하기
          </button>
        )}
      </div>
      <div className='card-options'>
        <BackToList />
        <SortingToDeadline boardData={boardData} />
        <SortingToLiked boardData={boardData} board_type={board_type} />
      </div>
      <ul>
        {boardData?.map((data) => (
          <li key={data.id}>
            <Card>
              <div className='CardImageWrapper'>
                <Card.Img
                  className='Card_Image'
                  onClick={() =>
                    history.push(`/Ydetail/${data.id}/${currentPage}`)
                  }
                  src={`${data.previewImage}`}></Card.Img>
              </div>
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
                      {data.user.nickname}
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
                      {format(new Date(data.boardUpdatedDate), 'yyyy-MM-dd')}
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
