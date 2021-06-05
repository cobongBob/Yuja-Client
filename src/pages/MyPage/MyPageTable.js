import React, { useCallback, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './myPage.scss';
import MyPageLikeWrite from './MyPageLikeWrite';
import MyPagePortfolioTable from './MyPagePortfolioTable';
import MyPageYoutuberTable from './MyPageYoutuberTable';

const MyPageTable = ({ boardData, userData }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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
            <MyPageYoutuberTable
              boardData={boardData}
              userData={userData}
              board_code={1}
            />
          </Col>
          <Col xs={4} md={4}>
            <MyPageLikeWrite boardData={boardData} userData={userData} />
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
            <MyPagePortfolioTable
              boardData={boardData}
              board_code={2}
              userData={userData}
            />
          </Col>
          <Col xs={6}>
            <MyPagePortfolioTable
              boardData={boardData}
              board_code={3}
              userData={userData}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MyPageTable;
