import React, { useMemo } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import { COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';
import '../components/scss/Ytable.scss';
import { Link } from 'react-router-dom';

const Ytable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  const rowProps = (row) => ({
    onClick: () => alert(JSON.stringify(row.values)),
    style: {
      cursor: 'pointer',
    },
  });

  return (
    <>
      <h1>유튜버 게시판</h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps(rowProps(row))}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='PagingWrapper'>
        <div className='ButtonWrapper'>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            이전
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            다음
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}>
            {'>>'}
          </button>
          <div className='WriteButton'>
            <Link to='#'> 글쓰기</Link>
          </div>
        </div>
        <span>
          현재
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          || Go to page:
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}>
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize} 개씩 보기
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Ytable;