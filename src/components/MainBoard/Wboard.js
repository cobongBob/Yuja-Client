import React, { useEffect } from 'react';
import './Wboard.scss';
import { Col, Row } from 'react-bootstrap';
import { FaRegHandshake, FaHandshake } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getMainData } from '../../redux/main/mainReducer';
const Wboard = () => {
  const dispatch = useDispatch();
  const { WmainList } = useSelector((state) => state.mainReducer);
  const { CmainList } = useSelector((state) => state.mainReducer);

  console.log(666666666666, WmainList);
  console.log(7777777777777, CmainList);

  useEffect(() => {
    dispatch(getMainData());
  }, []);

  return (
    <div>
      <div className='win-title'>
        <span>
          <FaHandshake></FaHandshake>
        </span>{' '}
        Win-Win{' '}
      </div>
      <Row className='win-body'>
        <Col sm>
          <div className='win-grow'>
            {' '}
            성장해요
            {WmainList.map((list) => (
              <>
                <span>{list.user.username}</span>
                <h1>{list.title}</h1>
              </>
            ))}
          </div>
        </Col>
        <Col sm>
          <div className='win-collabo'>
            {' '}
            합방해요
            {CmainList.map((list) => (
              <>
                <span>{list.user.username}</span>
                <h1>{list.title}</h1>
              </>
            ))}{' '}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Wboard;
