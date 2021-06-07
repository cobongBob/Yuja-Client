import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Eboard from '../../components/MainBoard/Eboard';
import Thboard from '../../components/MainBoard/Thboard';
import Yboard from '../../components/MainBoard/Yboard';
import './MainBoard.scss';
import { FaRegIdCard } from 'react-icons/fa';

const MainBoard = () => {
  return (
    <>
      <div className="new-board">
        <span>
          <FaRegIdCard></FaRegIdCard>
        </span>
        신규공고 / 신입소개
      </div>
      <Row className="Main_Board_Wrapper">
        <Col sm>
          <Yboard></Yboard>
        </Col>
        <Col sm>
          <Eboard></Eboard>
        </Col>
        <Col sm>
          <Thboard></Thboard>
        </Col>
      </Row>
    </>
  );
};

export default MainBoard;
