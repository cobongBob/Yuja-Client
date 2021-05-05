import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { FcLike, FcOk } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import YapiService from './YapiService';
import {
  RiArrowLeftCircleFill,
  RiArrowLeftCircleLine,
  RiArrowRightCircleFill,
  RiArrowRightCircleLine,
} from 'react-icons/ri';
import './Ylist.scss';

const Ylist = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(11);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i < Math.ceil(data.length / dataPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? 'active' : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    YapiService.fetchBoards().then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}>&hellip;</li>;
  }

  return (
    <div className='card-container'>
      {currentData.map((data) => (
        <Card key={data.id}>
          <Card.Img src='/img/board_pic/thumbnailer_pic/thum3.PNG'></Card.Img>
          <Card.Header>
            <Card.Title>
              <Link to={`/YoutuberProfile/`} className='card-link'>
                {data.user.username}
              </Link>
              {/* YoutuberProfile/뒤에 user_name or user_id(번호) 붙여줘야함 */}
              <Link to={`/Ydetail/${data.id}`} className='card-link'>
                {data.title}
              </Link>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {/* 기본값 중에서 경력, 급여 등의 중요내용 넣기 */}
            <Card.Text>
              {data.content} 이거 테스트 내용 길어지면 어떻게 되는지 실험하려고
              쓰는 글자들~~
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <span>
              <strong>마감일 </strong>
            </span>
            <strong>{format(new Date(data.updatedDate), 'yyyy-MM-dd')}</strong>
            <div className='card-like'>
              <FcLike size={20} /> {data.likes}
            </div>
          </Card.Footer>
        </Card>
      ))}
      <div className='card-paging'>
        <ul>
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage == pages[0] ? true : false}
            >
              {/* 호버시 이미지 바꾸기 해야함..... */}
              <RiArrowLeftCircleLine className='icon-arrow' />
              <RiArrowLeftCircleFill className='icon-arrow-hover' />
            </button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage == pages[pages.length - 1] ? true : false}
            >
              <div>
                <RiArrowRightCircleLine className='icon-arrow' />
                <RiArrowRightCircleFill className='icon-arrow-hover' />
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Ylist;
