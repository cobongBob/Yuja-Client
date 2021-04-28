import React from 'react';
import './scss/Wboard.scss';
import { Col, Row } from 'react-bootstrap';
const Wboard = () => {
  return (
    <div>
      <div className='win-title'> Win-Win </div>
      <Row className='win-body'>
        <Col sm>
          <div className='win-grow'> 성장해요 </div>
        </Col>
        <Col sm>
          <div className='win-collabo'> 합방해요 </div>
        </Col>
      </Row>
    </div>
  );
};

export default Wboard;
