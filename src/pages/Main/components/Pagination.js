import React, { useState } from 'react';
import {
  RiArrowLeftCircleFill,
  RiArrowLeftCircleLine,
  RiArrowRightCircleFill,
  RiArrowRightCircleLine,
} from 'react-icons/ri';
import '../Youtuber/Ylist.scss';

export default function Pagination({ boardPerPage, totalBoards, clickPage }) {
  // const [pageNumberLimit, setPageNumberLimit] = useState(5);
  // const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  // const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalBoards / boardPerPage); i++) {
    pages.push(i);
  }

  {
    /*
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? 'active' : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
*/
  }

  {
    /* const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
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
*/
  }

  return (
    <div className='card-paging'>
      <ul>
        <li>
          <RiArrowLeftCircleLine className='icon-arrow' />
          <RiArrowLeftCircleFill className='icon-arrow-hover' />
        </li>
        {pages.map((number) => (
          <li key={number}>
            <button
              onClick={() => clickPage(number)}
              disabled={boardPerPage === pages[0] ? true : false}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <div>
            <RiArrowRightCircleFill className='icon-arrow-hover' />
            <RiArrowRightCircleLine className='icon-arrow' />
          </div>
        </li>
      </ul>
    </div>
  );
}
