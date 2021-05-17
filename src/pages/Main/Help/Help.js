import React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import './Help.scss';

// navi에서 고객센터를 누르면 보이는 전체 컴포넌트
const Help = () => {
  return (
    <div className='HelpPageWrapper'>
      <h1>고객센터 게시판</h1>
      <div className='AccordionWrapper'>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                유튜버 인증 시간은 보통 얼마나 걸리나요?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>나도몰라 임마</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='1'>
                왜? 저는 인증이 안되었을까요?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='1'>
              <Card.Body>ㅈ밥이라???</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='2'>
                비지니스 관계에서 트러블 발생시 어디로 문의 해야하나요?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='2'>
              <Card.Body>경찰서</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='3'>
                광고 등록은 어떤 순서인가요?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='3'>
              <Card.Body>인기순</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='4'>
                Premium 배너가 있나요?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='4'>
              <Card.Body>있어도 넌 못해</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='5'>
                Youtuber 채널소개 수정하려면 어떻게 해야하나요?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='5'>
              <Card.Body>??????????????</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='6'>
                살려줘...................
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='6'>
              <Card.Body>놉</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
};

export default Help;
