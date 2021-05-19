import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FcLike } from "react-icons/fc";
import "../Youtuber/Ylist.scss";
import BackToList from "../components/BackToList";
import SortingToDeadline from "../components/SortingToDeadline";
import SortingToLiked from "../components/SortingToLiked";

export default function ThumbnailerTable({ boardData, board_type, currentPage }) {
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
          <li>
            <Card key={data.id}>
              <Card.Img src={`http://localhost:8888/files/thumbnail/${data.thumbnail}`}></Card.Img>
              <Card.Header>
                <Card.Title>
                  <div>
                    {data.payType} {data.payAmount}원
                  </div>
                  <div> 사용기술 {data.tools[0]} </div>
                  <div> 모집분야 {data.worker} </div>
                  <div className='card-deadline'>
                    <span>마감일 </span>
                    {format(new Date(data.expiredDate), "yyyy-MM-dd")}
                  </div>
                  <div className='card-like'>
                    <FcLike size={22} /> {data.likes}
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
                    <Link to={`/ThumbDetail/${board_type}/${data.id}/${currentPage}`} className='card-link'>
                      {data.title}
                    </Link>
                  </div>
                </Card.Text>
                <Card.Footer>
                  <div>
                    <strong>
                      <span>수정일 </span>
                      {format(new Date(data.updatedDate), "yyyy-MM-dd")}
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
