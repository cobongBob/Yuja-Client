import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FcLike } from "react-icons/fc";
import "../Youtuber/Ylist.scss";
import SortingToDeadline from "../components/SortingToDeadline";
import SortingToLiked from "../components/SortingToLiked";
import BackToList from "../components/BackToList";

const YoutuberTable = ({ boardData }) => {
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
                  <Link to={`/YoutuberProfile/`} className='card-link'>
                    {data.user.username}
                  </Link>
                  <Link to={`/Ydetail/${data.id}`} className='card-link'>
                    {data.title}
                  </Link>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>
                    {data.payType} : {data.payAmount}원
                    <br />
                    {data.worker}
                    <br />
                    tools: {data.tools[0]}
                  </strong>
                </Card.Text>
                <Card.Footer>
                  <div>
                    <strong>
                      <span>수정일 </span>
                      {format(new Date(data.updatedDate), "yyyy-MM-dd")}
                    </strong>
                  </div>
                  <div>
                    <strong>
                      <span>마감일 </span>
                      {format(new Date(data.expiredDate), "yyyy-MM-dd")}
                    </strong>
                  </div>
                  <div className='card-like'>
                    <FcLike size={20} /> {data.likes}
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
