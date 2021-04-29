import { format } from 'date-fns';

export const COLUMNS = [
  {
    Header: '글번호',
    accessor: (row, i) => i + 1,
    disableFilters: true,
  },
  {
    Header: '제목',
    accessor: 'title',
  },
  {
    Header: '작성자',
    accessor: 'user.nickname',
  },
  {
    Header: '조회수',
    accessor: 'hit',
  },
  {
    Header: '좋아요',
    accessor: 'likes',
  },
];
