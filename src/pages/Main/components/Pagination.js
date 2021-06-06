import React from "react";
import { RiArrowLeftCircleLine, RiArrowRightCircleLine } from "react-icons/ri";
import "./Components.scss";

export default function Pagination(props) {
  const { boardPerPage, totalBoards, currentPage, clickPage } = props;

  const pages = [];
  const endPages = Math.ceil(totalBoards / boardPerPage); // 페이지 수
  let lastPage = Math.ceil(currentPage / 5) * 5; // 현재의 마지막 페이지
  let startPage = lastPage - 4;
  for (let i = startPage; i <= lastPage; i++) {
    if (i <= endPages) {
      pages.push(i);
    }
    if (pages === 1) return null;
  }

  const prevBtn = () => {
    if (Number(currentPage) === 1) return;
    clickPage(currentPage - 1);
  };

  const nextBtn = () => {
    if (Number(currentPage) === endPages) return;
    clickPage(Number(currentPage) + 1);
  };

  return (
    <div className='card-paging'>
      <ul>
        <button onClick={prevBtn}>
          <RiArrowLeftCircleLine className='icon-arrow' />
        </button>
        {pages.map((number) => {
          return (
            <li key={number} className={number === Number(currentPage) ? "focus" : "null"}>
              <div onClick={() => clickPage(number)}>{number}</div>
            </li>
          );
        })}
        <button onClick={nextBtn}>
          <RiArrowRightCircleLine className='icon-arrow' />
        </button>
      </ul>
    </div>
  );
}
