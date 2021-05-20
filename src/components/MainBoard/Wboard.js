import React from 'react';
import './Wboard.scss';
import { Col, Row } from 'react-bootstrap';
import { FaHandshake } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { format } from 'date-fns/esm';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
const Wboard = () => {
  const { WmainList, CmainList } = useSelector((state) => state.mainReducer);
  const history = useHistory();
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
                <table className='ListTable'>
                  <thead>
                    <tr>
                      <td className='MainWriter'>작성자</td>
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
                          <td
                            onClick={() =>
                              history.push(`/BoardDetail/WinWin/${list.id}/1`)
                            }
                            style={{ cursor: 'pointer' }}>
                            {list.title}
                          </td>
                          <td>{list.updatedDate.substr(0, 10)}</td>
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
          <div className='WinWrapper'>
            <div className='win-grow'>성장해요</div>
            <div className='WinListWrapper'>
              <div className='WinList'>
                <table className='ListTable'>
                  <thead>
                    <tr>
                      <td className='MainWriter'>작성자</td>
                      <td>제목</td>
                      <td className='MainDate'>날짜</td>
                      <td>조회수</td>
                    </tr>
                  </thead>
                  <tbody>
                    {CmainList &&
                      CmainList.map((list, index) => (
                        <tr key={index}>
                          <td>{list.user.nickname}</td>
                          <td
                            onClick={() =>
                              history.push(`/BoardDetail/Collabo/${list.id}/1`)
                            }
                            style={{ cursor: 'pointer' }}>
                            {list.title}
                          </td>
                          <td>{list.updatedDate.substr(0, 10)}</td>
                          <td>{list.hit}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Wboard;
