import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router';

const MyPagePagination = (props) => {
  const { boardData, board_code, totalBoard } = props;
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listPerPage, setListPerPage] = useState(10);
  const indexOfLast = currentPage * listPerPage;
  const indexOfFirst = indexOfLast - listPerPage;
  const currentPosts = (tmp) => {
    let currentLists = 0;
    currentLists = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  console.log(indexOfLast);
  return (
    <div>
      <ul></ul>
    </div>
  );
};

export default MyPagePagination;
