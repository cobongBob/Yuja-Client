import React, { useCallback, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './myPage.scss';
import MyPageLikeWrite from './MyPageLikeWrite';
import MyPagePortfolioTable from './MyPagePortfolioTable';
import MyPageYoutuberTable from './MyPageYoutuberTable';

const MyPageTable = ({ boardData }) => {
  return (
    <div className='tableWrapper'>
      <span className='beforeModifyTitle'>즐겨찾기 목록 </span>
      <div className='myPage-tableBox'>
        <Row>
          <Col sm>
            <MyPageYoutuberTable boardData={boardData} board_code={1} />
          </Col>
          <Col sm>
            <MyPageLikeWrite boardData={boardData} />
          </Col>
        </Row>
        <Row>
          <Col sm>
            <MyPagePortfolioTable boardData={boardData} board_code={2} />
          </Col>
          <Col sm>
            <MyPagePortfolioTable boardData={boardData} board_code={3} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MyPageTable;
