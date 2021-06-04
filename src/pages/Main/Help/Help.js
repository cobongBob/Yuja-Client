import React, { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { FaHeadset } from "react-icons/fa";
import "./Help.scss";
import { fetchAllQnABoards } from "../../../apiService/AdminApiService";

// navi에서 고객센터를 누르면 보이는 전체 컴포넌트
const Help = () => {
  const [allQnAs, setAllQnAs] = useState([]);
  useEffect(() => {
    fetchAllQnABoards().then((res) => {
      setAllQnAs(res.data);
    });
  }, []);
  return (
    allQnAs && (
      <div className='HelpPageWrapper'>
        <div className='IconTitleWrapper'>
          <FaHeadset className='HelpIcon'></FaHeadset>
          <h1>고객센터</h1>
        </div>
        <div className='AccordionBigWrapper'>
          <div className='AccordionWrapper'>
            <Accordion>
              {allQnAs.map((qan, idx) => (
                <Card>
                  <Card.Header>
                    <div className='QuestionWrapper'>
                      <div className='QuestionIcon'>Q.</div>
                      <Accordion.Toggle className='Question' as={Button} variant='link' eventKey={idx + 1}>
                        {qan.title}
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse className='Answer' eventKey={idx + 1}>
                    <Card.Body>{qan.content}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
              {/* <Card>
                <Card.Header>
                  <div className='QuestionWrapper'>
                    <div className='QuestionIcon'>Q.</div>
                    <Accordion.Toggle className='Question' as={Button} variant='link' eventKey='1'>
                      유튜버 인증 시간은 보통 얼마나 걸리나요?
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse className='Answer' eventKey='1'>
                  <Card.Body>관리자가 최대한 자주 확인하고 관리하고 있으나 최대 3일 정도가 소요됩니다.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <div className='QuestionWrapper'>
                    <div class='QuestionIcon'>Q.</div>
                    <Accordion.Toggle as={Button} variant='link' eventKey='2'>
                      왜? 저는 인증이 안되었을까요?
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse className='Answer' eventKey='2'>
                  <Card.Body>
                    유튜버 인증시 업로드하신 인증 이미지 파일이 부적절 하거나 파일에 문제가 있어 관리자가 <br />
                    유튜버 판단이 어려웠을거라 생각이 듭니다. 다시한번 깔끔한 이미지로 재 신청 하시면 됩니다.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <div className='QuestionWrapper'>
                    <div class='QuestionIcon'>Q.</div>
                    <Accordion.Toggle as={Button} variant='link' eventKey='3'>
                      Youtuber 채널소개 이미지를 바꾸고싶으면 어떻게 해야하나요?
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse className='Answer' eventKey='3'>
                  <Card.Body>
                    유튜버 채널 소개에 보이는 이미지는 실제 유튜버 채널에 등록되어있는 사진이므로
                    <br /> 유튜버 채널에 사진을 수정하시면 됩니다.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <div className='QuestionWrapper'>
                    <div class='QuestionIcon'>Q.</div>
                    <Accordion.Toggle as={Button} variant='link' eventKey='4'>
                      저는 왜 즐겨찾기를 할수 없을까요?
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse className='Answer' eventKey='4'>
                  <Card.Body>
                    유튜버, 편집자, 썸네일러 게시판에 즐겨찾기 기능은 일반회원은 할 수 없습니다. 이용하시려면 유튜버,
                    편집자, 썸네일러 인증을 거쳐야 합니다.
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <div className='QuestionWrapper'>
                    <div class='QuestionIcon'>Q.</div>
                    <Accordion.Toggle as={Button} variant='link' eventKey='5'>
                      편집영상이나 썸네일 이미지 크기가 제한이 있나요?
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse className='Answer' eventKey='5'>
                  <Card.Body>크기에 대한 제한은 없지만 유튜브 공식 이미지 크기인 1280px x 720을 권장합니다.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <div className='QuestionWrapper'>
                    <div class='QuestionIcon'>Q.</div>
                    <Accordion.Toggle as={Button} variant='link' eventKey='6'>
                      채팅에서 닉네임을 제데로 검색해도 안되요.
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse className='Answer' eventKey='6'>
                  <Card.Body>
                    저희 유자 채팅 서비스는 실시간 채팅 시스템으로써 해당 닉네임이 존재하더라도 접속 상태가 아니면
                    채팅을 보낼 수 없습니다.
                  </Card.Body>
                </Accordion.Collapse>
              </Card> */}
            </Accordion>
          </div>
        </div>
      </div>
    )
  );
};

export default Help;
