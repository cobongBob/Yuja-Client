import React from 'react';

const MyPagePagination = (props) => {
  const { boardPerPage, currentPage } = props;

  const pages = [];
  let lastPage = Math.ceil(currentPage / 5) * 5; // 현재의 마지막 페이지
  let startPage = lastPage - 4;
  for (let i = startPage; i <= lastPage; i++) {
    if (i <= 5) {
      pages.push(i);
    }
    if (pages === 1) return null;
  }
  return (
    <div>
      <ul>
        {pages.map((number) => {
          return (
            <li
              key={number}
              className={number === Number(currentPage) ? 'focus' : 'null'}
            >
              {/*<div onClick={() => clickPage(number)}>{number}</div>*/}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyPagePagination;
