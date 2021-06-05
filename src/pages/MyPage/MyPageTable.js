import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './myPage.scss';
import MyPageLikeWrite from './MyPageLikeWrite';
import MyPagePortfolioTable from './MyPagePortfolioTable';
import MyPageYoutuberTable from './MyPageYoutuberTable';

const MyPageTable = ({ boardData }) => {
  const history = useHistory();
  const path = history.location.pathname;
  const lastPageNum = path.substr(path.lastIndexOf('/') + 1);
  const pageNum = useRef(lastPageNum ? lastPageNum : 1);
  const [currentPage, setCurrentPage] = useState(pageNum.current);
  const [boardPerPage] = useState(5);
  const indexOfLastData = currentPage * boardPerPage;
  const indexOfFirstData = indexOfLastData - boardPerPage;

  return (
    <div className='tableWrapper'>
      <span className='beforeModifyTitle'>즐겨찾기 목록 </span>
      <div className='myPage-tableBox'>
        <Row
          style={{
            marginLeft: '8rem',
            marginRight: '8rem',
            marginBottom: '6rem',
          }}
        >
          <Col xs={8} md={8}>
            <MyPageYoutuberTable boardData={boardData} board_code={1} />
          </Col>
          <Col xs={4} md={4}>
            <MyPageLikeWrite boardData={boardData} />
          </Col>
        </Row>
        <Row
          style={{
            marginLeft: '10rem',
            marginRight: '10rem',
            marginBottom: '6rem',
          }}
        >
          <Col xs={6}>
            <MyPagePortfolioTable boardData={boardData} board_code={2} />
          </Col>
          <Col xs={6}>
            <MyPagePortfolioTable boardData={boardData} board_code={3} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MyPageTable;
