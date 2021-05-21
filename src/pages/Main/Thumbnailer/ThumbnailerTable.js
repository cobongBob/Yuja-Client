import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { format } from "date-fns";
import "../Youtuber/Ylist.scss";
import BackToList from "../components/BackToList";
import SortingToDeadline from "../components/SortingToDeadline";
import SortingToLiked from "../components/SortingToLiked";
import "./Thumb.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function ThumbnailerTable({ boardData, board_type, currentPage, likeHandler, dislikeHandler }) {
  const history = useHistory();
  return (
    <div className='card-container'>
      <div className='card-options'>
        <Link to={`/ThumbRegister/${board_type}`} className='registerBtn'>
          이력서 등록하기
        </Link>
      </div>
      <div className='card-options'>
        <BackToList />
        <SortingToDeadline boardData={boardData} />
        <SortingToLiked boardData={boardData} />
      </div>
      <ul>
        {boardData?.map((data) => (
          <li key={data.id}>
            <Card>
              <Card.Img
                className='thumbnail-for-Main'
                onClick={() => history.push(`/ThumbDetail/${board_type}/${data.id}/${currentPage}`)}
                src={`http://localhost:8888/files/thumbnail/${data.thumbnail}`}
              ></Card.Img>
              <Card.Header>
                <Card.Title>
                  <div>
                    {data.payType} {data.payAmount}원
                  </div>
                  <div> 사용기술 {data.tools[0]} </div>
                  <div className='card-deadline'>
                    <span>마감일 </span>
                    {format(new Date(data.expiredDate), "yyyy-MM-dd")}
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
                <Card.Footer>
                  <div>
                    <strong>
                      <span>수정일 </span>
                      {format(new Date(data.boardUpdatedDate), "yyyy-MM-dd")}
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
