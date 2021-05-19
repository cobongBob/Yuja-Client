import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FcLike } from "react-icons/fc";
import "../Youtuber/Ylist.scss";
import BackToList from "../components/BackToList";
import SortingToDeadline from "../components/SortingToDeadline";
import SortingToLiked from "../components/SortingToLiked";

export default function EditorTable({ eBoardData, board_type }) {
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
              <Card.Img src={data.previewImage}></Card.Img>
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
