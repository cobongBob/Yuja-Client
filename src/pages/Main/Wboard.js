import React from "react";
import "./Wboard.scss";
import { Col, Row } from "react-bootstrap";
import { FaHandshake } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
const Wboard = () => {
  const { WmainList, CmainList } = useSelector((state) => state.mainReducer);
  const history = useHistory();
  return (
    <div>
      <div onClick={() => history.push("/Community/Winwin/1")} className='win-title'>
        <span>
          <FaHandshake></FaHandshake>
        </span>{" "}
        Win-Win{" "}
      </div>
      <Row className='win-body'>
        <Col sm>
          <div className='WinWrapper'>
            <div className='win-grow'>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/Community/Winwin/1");
                }}
              >
                성장해요
              </span>
            </div>
            <div className='WinListWrapper'>
              <div className='WinList'>
                <table className='ListTable'>
                  <thead>
                    <tr>
                      <td className='MainWriter'>작성자</td>
                      <td className='MainTitle'>제목</td>
                      <td className='MainDate'>날짜</td>
                      <td className='MainHit'>조회수</td>
                    </tr>
                  </thead>
                  <tbody>
                    {WmainList?.map((list, index) => (
                      <tr
                        key={index}
                        onClick={() => {
                          history.push(`/BoardDetail/Winwin/${list.id}/1`);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{list.user.nickname}</td>
                        <td>
                          {list.title}
                          <span className='commentNum'> [{list.comments}] </span>
                        </td>
                        <td>{list.createDate.substr(5, 5)}</td>
                        <td>{list.hit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Col>
        <Col sm>
          <div className='WinWrapper'>
            <div className='win-collabo'>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/Community/Collabo/1");
                }}
              >
                합방해요
              </span>
            </div>
            <div className='WinListWrapper'>
              <div className='WinList'>
                <table className='ListTable'>
                  <thead>
                    <tr>
                      <td className='MainWriter'>작성자</td>
                      <td className='MainTitle'>제목</td>
                      <td className='MainDate'>날짜</td>
                      <td className='MainHit'>조회수</td>
                    </tr>
                  </thead>
                  <tbody>
                    {CmainList?.map((list, index) => (
                      <tr
                        key={index}
                        onClick={() => history.push(`/BoardDetail/Collabo/${list.id}/1`)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{list.user.nickname}</td>
                        <td>
                          {list.title}
                          <span className='commentNum'> [{list.comments}] </span>
                        </td>
                        <td>{list.createDate.substr(5, 5)}</td>
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
