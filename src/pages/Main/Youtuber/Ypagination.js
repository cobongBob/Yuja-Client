import React from 'react';

const Ypagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <a href='#' className='page-link' onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ypagination;
