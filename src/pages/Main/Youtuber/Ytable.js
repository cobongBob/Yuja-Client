import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { COLUMNS } from './columns';
import './Ytable.scss';
import { Link, useHistory } from 'react-router-dom';
import YtableTotalFilter from './YtableTotalFilter';
import YapiService from './YapiService';

const Ytable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [data, setData] = useState([]);

  useEffect(() => {
    YapiService.fetchBoards().then((res) => {
      setData(res.data);
    });
  }, []);

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
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        sortBy: [
          {
            id: '글번호',
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  const history = useHistory();

  let Yhistory = useCallback(
    (row) => history.push(`/Ydetail/${row.original.id}`),
    [history]
  );

  const rowProps = (row) => ({
    onClick: () => Yhistory(row),
    style: {
      cursor: 'pointer',
    },
  });

  return (
    <>
      <div className='YtableHeader'>
        <h1>유튜버 게시판</h1>
        <Link className='LinkWrite' to='/Yregister'>
          {' '}
          글쓰기
        </Link>
        <YtableTotalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table className='Ytable' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({ title: undefined })
                  )}>
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
        </div>
        <span>
          현재
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          || Go to page {''}
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