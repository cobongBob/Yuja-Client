import React from 'react';
import './Wboard.scss';
import { Col, Row } from 'react-bootstrap';
import { FaHandshake } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const Wboard = () => {
  const { WmainList, CmainList } = useSelector((state) => state.mainReducer);
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
          <div className='WinWrapper'>
            <div className='win-grow'>성장해요</div>
            <div className='WinListWrapper'>
              <div className='WinList'>
                <table>
                  <thead>
                    <tr>
                      <td>작성자</td>
                      <td>제목</td>
                      <td>날짜</td>
                      <td>조회수</td>
                    </tr>
                  </thead>
                  <tbody>
                    {WmainList &&
                      WmainList.map((list, index) => (
                        <tr key={index}>
                          <td>{list.user.nickname}</td>
                          <td>{list.title}</td>
                          <td>{list.updatedDate}</td>
                          <td>{list.hit}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {/* {WmainList &&
                WmainList.map((list, index) => ({
                   <span>{list.user.username}</span>
                    <h1>{list.title}</h1> 
                }))} */}
            </div>
          </div>
        </Col>
        <Col sm>
          <div className='win-collabo'>
            {' '}
            합방해요
            {CmainList &&
              CmainList.map((list) => (
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
