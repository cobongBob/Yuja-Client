import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import { FcLike, FcOk } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import YapiService from './YapiService';
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
          className={currentPage == number ? 'active' : null}>
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
    <div className='YlistWrapper'>
      {currentData.map((data) => (
        <Card
          key={data.id}
          variant='top'
          className='text-center p-3'
          border='danger'
          style={{ width: '18rem', display: 'inline-block', margin: 'auto' }}>
          <Card.Img src='/img/board_pic/thumbnailer_pic/thum3.PNG'></Card.Img>
          <Card.Header>
            <Link to={`/YoutuberProfile/`}>{data.user.username}</Link>
            {/* YoutuberProfile/뒤에 user_name or user_id(번호) 붙여줘야함 */}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <Link to={`/Ydetail/${data.id}`}>{data.title}</Link>
            </Card.Title>
            <hr />
            <ol>
              <li>
                <Card.Text>{data.content}</Card.Text>
              </li>
              <li>
                <Card.Text>{data.content}</Card.Text>
              </li>
              <li>
                <Card.Text>{data.content}</Card.Text>
              </li>
              <li>
                <Card.Text>{data.content}</Card.Text>
              </li>
            </ol>
          </Card.Body>
          <Card.Footer>
            <p>
              <strong>마감일</strong>
            </p>
            <strong>{format(new Date(data.updatedDate), 'yyyy-MM-dd')}</strong>
            <div>
              <FcLike size={20} /> {data.likes}
            </div>
          </Card.Footer>
        </Card>
      ))}
      <br />
      <ul className='YpageNumbers'>
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}>
            이전
          </button>
        </li>
        {pageDecrementBtn}

        {renderPageNumbers}

        {pageIncrementBtn}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}>
            다음
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Ylist;
