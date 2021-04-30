import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Eboard from './Eboard';
import Sboard from './Sboard';
import Yboard from './Yboard';
import './scss/MainBoard.scss';

const MainBoard = () => {
  return (
    <>
      <div className='new-board'> 신규공고 / 신입소개 </div>
      <Row className='Main_Board_Wrapper'>
        <Col sm>
          <Yboard></Yboard>
        </Col>
        <Col sm>
          <Eboard></Eboard>
        </Col>
        <Col sm>
          <Sboard></Sboard>
        </Col>
      </Row>
    </>
  );
};

export default MainBoard;
