import React, { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { FaHeadset } from "react-icons/fa";
import "./Help.scss";
import { fetchAllQnABoards } from "../../apiService/AdminApiService";
import ReactQuill from "react-quill";

// navi에서 고객센터를 누르면 보이는 전체 컴포넌트
const Help = () => {
  const [allQnAs, setAllQnAs] = useState([]);
  useEffect(() => {
    fetchAllQnABoards().then((res) => {
      setAllQnAs(res.data);
    });
  }, []);
  return (
    <div className='HelpPageWrapper'>
      <div className='IconTitleWrapper'>
        <FaHeadset className='HelpIcon'></FaHeadset>
        <h1>고객센터</h1>
      </div>
      <div className='AccordionBigWrapper'>
        <div className='AccordionWrapper'>
          <Accordion>
            {allQnAs?.map((qan, idx) => (
              <Card key={idx}>
                <Accordion.Toggle className='Question' as={Button} variant='link' eventKey={idx + 1}>
                  <Card.Header>
                    <div className='QuestionWrapper'>
                      <div className='QuestionIcon'>Q.</div>
                      {qan.title}
                    </div>
                  </Card.Header>
                </Accordion.Toggle>
                <Accordion.Collapse className='Answer' eventKey={idx + 1}>
                  <Card.Body className='AnswerBody'>
                    <ReactQuill className='help_quill' value={qan.content || ""} readOnly={true} theme={"bubble"} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Help;
