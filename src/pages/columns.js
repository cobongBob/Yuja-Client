import { format } from 'date-fns';

export const COLUMNS = [
  {
    Header: '글번호',
    accessor: 'board_id',
    disableFilters: true,
  },
  {
    Header: '작성자',
    accessor: 'user_id',
  },
  {
    Header: '제목',
    accessor: 'title',
    getProps: () => ({ someFunc: () => alert('clicked') }),
  },
  {
    Header: '등록일',
    accessor: 'create_date',
    Cell: ({ value }) => {
      return format(new Date(value), 'yyyy/MM/dd');
    },
  },
  {
    Header: '마감일',
    accessor: 'update_date',
    Cell: ({ value }) => {
      return format(new Date(value), 'yyyy/MM/dd');
    },
  },
  {
    Header: '조회수',
    accessor: 'vies',
  },
  {
    Header: '좋아요',
    accessor: 'hit',
  },
];
