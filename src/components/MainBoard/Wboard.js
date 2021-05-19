import React from "react";
import "./Wboard.scss";
import { Col, Row } from "react-bootstrap";
import { FaHandshake } from "react-icons/fa";
import { useSelector } from "react-redux";
const Wboard = () => {
  const { WmainList, CmainList } = useSelector((state) => state.mainReducer);
  return (
    <div>
      <div className='win-title'>
        <span>
          <FaHandshake></FaHandshake>
        </span>{" "}
        Win-Win{" "}
      </div>
      <Row className='win-body'>
        <Col sm>
          <div className='win-grow'>
            {" "}
            성장해요
            {WmainList &&
              WmainList.map((list) => (
                <>
                  <span>{list.user.username}</span>
                  <h1>{list.title}</h1>
                </>
              ))}
          </div>
        </Col>
        <Col sm>
          <div className='win-collabo'>
            {" "}
            합방해요
            {CmainList &&
              CmainList.map((list) => (
                <>
                  <span>{list.user.username}</span>
                  <h1>{list.title}</h1>
                </>
              ))}{" "}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Wboard;
