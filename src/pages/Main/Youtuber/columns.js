import { format } from 'date-fns';

export const COLUMNS = [
  {
    Header: '작성자',
    accessor: 'user.nickname',
  },
  {
    Header: '제목',
    accessor: 'title',
  },
  {
    Header: '조회수',
    accessor: 'hit',
  },
  {
    Header: '좋아요',
    accessor: 'likes',
  },
  {
    Header: '수정일',
    accessor: 'updatedDate',
    Cell: ({ value }) => {
      return format(new Date(value), 'yyyy-MM-dd');
    },
  },
];
