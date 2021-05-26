import React, { useCallback } from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { format } from "date-fns";
import "../Youtuber/Ylist.scss";
import BackToList from "../components/BackToList";
import SortingToLiked from "../components/SortingToLiked";
import "./Thumb.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ToastCenter } from "../../../modules/ToastModule";

export default function ThumbnailerTable({
  userData,
  boardData,
  board_type,
  currentPage,
  likeHandler,
  dislikeHandler,
  wrote,
}) {
  const history = useHistory();
  const writeBoard = useCallback(() => {
    if (userData && userData.id > 0) {
      history.push(`/ThumbRegister/${board_type}`);
    } else {
      ToastCenter(`로그인 해주세요`);
    }
  }, [userData, history, board_type]);
  const modifyBoard = useCallback(() => {
    if (userData && userData.id > 0) {
      history.push(`/ThumbModify/Thumb/${wrote[0].id}/1`);
    } else {
      ToastCenter(`로그인 해주세요`);
    }
  }, [userData, history, wrote]);
  return (
    <div className='card-container'>
      <div className='card-options'>
        {wrote.length === 0 ? (
          <button onClick={writeBoard} className='registerBtn'>
            이력서 등록하기
          </button>
        ) : (
          <button onClick={modifyBoard} className='detail-update-btn'>
            이력서 수정하기
          </button>
        )}
      </div>
      <div className='card-options'>
        <BackToList />
        <SortingToLiked board_type={board_type} />
      </div>
      <ul>
        {boardData?.map((data) => (
          <li key={data.id}>
            <Card>
              <Card.Img
                className='thumbnail-for-Main'
                onClick={() => history.push(`/ThumbDetail/${board_type}/${data.id}/${currentPage}`)}
                src={data.thumbnail && `http://localhost:8888/files/thumbnail/${data.thumbnail}`}
              ></Card.Img>
              <Card.Header>
                <Card.Title>
                  <div>
                    {data.payType} {data.payAmount}원
                  </div>
                  <div> 사용기술 {data.tools[0]} </div>
                  <div className='card-deadline'>
                    <span>수정일 </span>
                    {format(new Date(data.boardUpdatedDate), "yyyy-MM-dd")}
                  </div>
                  <div className='card-like'>
                    {data && data.liked ? (
                      <button onClick={() => likeHandler(data.id)} className='starButton'>
                        <AiFillStar size={30} />
                        <span>{data.likes}</span>
                      </button>
                    ) : (
                      <button onClick={() => dislikeHandler(data.id)} className='starButton'>
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
                    <Link to={`/ThumbDetail/${board_type}/${data.id}/${currentPage}`} className='card-link'>
                      {data.title}
                    </Link>
                  </div>
                </Card.Text>
                <Card.Footer></Card.Footer>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
