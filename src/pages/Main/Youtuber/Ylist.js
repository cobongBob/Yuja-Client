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
  const [searchData, setSearchData] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
    pages.push(i);
  }

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

  useEffect(() => {
    YapiService.fetchBoards().then((res) => {
      res.data.sort((a, b) => {
        return (
          new Date(b.expiredDate).getTime() - new Date(a.expiredDate).getTime()
        );
      });
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

  const sortLikesData = () => {
    const sortedData = data.sort((a, b) => b.likes - a.likes);
    setData(sortedData);
    console.log(data);
  };

  const sortExpiredData = () => {
    const sortedExpiredData = data
      .sort((a, b) => b.expiredDate - a.expiredDate)
      .reverse();
    setData(sortedExpiredData);
    console.log(data);
  };

  return (
    <div className='card-container'>
      <div>
        검색:
        <input
          type='text'
          placeholder='유저, 제목, 툴 검색'
          onChange={(e) => {
            setSearchData(e.target.value);
          }}
        />
        <Link to='/Yregister'>등록하기</Link>
        <button onClick={() => sortExpiredData()}>마감일</button>
        <button onClick={() => sortLikesData()}>인기순</button>
      </div>
      {currentData
        .filter((data) => {
          if (searchData === '') {
            return data;
          } else if (
            data.user.username.toLowerCase().includes(searchData.toLowerCase())
          ) {
            return data;
          } else if (
            data.title.toLowerCase().includes(searchData.toLowerCase())
          ) {
            return data;
          } else if (
            data.tools[0].toLowerCase().includes(searchData.toLowerCase())
          ) {
            return data;
          }
        })
        .map((data) => (
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
                {data.payType} : {data.payAmount}원
                <br />
                {data.worker}
                <br />
                tools: {data.tools[0]}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <div>
                <span>
                  <strong>수정일 </strong>
                </span>
                <strong>
                  {format(new Date(data.updatedDate), 'yyyy-MM-dd')}
                </strong>
              </div>
              <div>
                <span>
                  <strong>마감일 </strong>
                </span>
                <strong>
                  {format(new Date(data.expiredDate), 'yyyy-MM-dd')}
                </strong>
              </div>
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
                <RiArrowRightCircleFill className='icon-arrow-hover' />
                <RiArrowRightCircleLine className='icon-arrow' />
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Ylist;
