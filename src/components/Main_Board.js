import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Eboard from './Eboard';
import Sboard from './Sboard';
import Yboard from './Yboard';
import './scss/Main_Board.scss';

const Main_Board = () => {
  return (
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
  );
};

export default Main_Board;
