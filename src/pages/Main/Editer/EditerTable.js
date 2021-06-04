import React, { useCallback, useMemo } from 'react';
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { format } from "date-fns";
import "../Youtuber/Ylist.scss";
import BackToList from "../components/BackToList";
import SortingToLiked from "../components/SortingToLiked";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ToastCenter } from "../../../modules/ToastModule";

export default function EditorTable({
  userData,
  eBoardData,
  board_type,
  currentPage,
  likeHandler,
  dislikeHandler,
  wrote,
}) {
  const history = useHistory();
  const writeBoard = useCallback(() => {
    if (userData && userData.id > 0) {
      history.push(`/EditorRegister/${board_type}`);
    } else {
      ToastCenter(`로그인 해주세요`);
    }
  }, [userData, history, board_type]);
  const gotomyResume = useCallback(() => {
    if (userData && userData.id > 0) {
      history.push(`/EDetail/Editor/${wrote[0].id}/1`);
    } else {
      ToastCenter(`로그인 해주세요`);
    }
  }, [userData, history, wrote]);

  return (
    <div className='card-container'>
      <div className='card-options'>
        {wrote.length === 0 ? (
          <button onClick={writeBoard} className='detail-update-btn'>
            포트폴리오 등록하기
          </button>
        ) : (
          <button onClick={gotomyResume} className='detail-update-btn'>
            내 포트폴리오 보기
          </button>
        )}
      </div>
      <div className='card-options'>
        <BackToList />
        <SortingToLiked board_type={board_type} />
      </div>
      <ul>
        {eBoardData?.map((data) => (
          <li key={data.id}>
            <Card>
              <div className='thumbnail-for-Main-Wrapper'>
                <Card.Img
                  className='thumbnail-for-Main'
                  onClick={() => history.push(`/EDetail/${board_type}/${data.id}/${currentPage}`)}
                  src={`${data.previewImage}`}
                ></Card.Img>
              </div>
              <Card.Header>
                <Card.Title className='editerTitle'>
                  <div>
                    <span>닉네임</span> {data.user.nickname}
                  </div>
                  <div>
                    <span>희망급여</span> {data.payType} {data.payAmount}원
                  </div>
                  <div>
                    <span>경력</span> {data.career.startsWith("경력") ? data.career.substr(2).trim() : data.career}
                  </div>
                  <div>
                    <span>사용기술</span> {data.tools && data.tools.join(", ")}
                  </div>
                </Card.Title>
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
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <div>{data.user.nickname}</div>
                  <div>
                    <Link to={`/EDetail/${board_type}/${data.id}/${currentPage}`} className='card-link'>
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
