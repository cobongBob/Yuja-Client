import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Container } from 'react-bootstrap';
import EditorApiService from './EditorApiService';

const EditorTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    EditorApiService.getAllBoard().then((res) => {
      //   editorBoardList.current.push(res.data);
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <Container>
        {data.map((data) => (
          <CardDeck>
            <Card key={data.id}>
              <Card.Img
                variant='top'
                src='/img/board_pic/editor_pic/thum1.png'
              ></Card.Img>
              <Card.Title> {data.user.title} </Card.Title>
              <Card.Text> 희망급여 </Card.Text>
              <Card.Footer> 좋아요 수 </Card.Footer>
            </Card>
          </CardDeck>
        ))}
      </Container>
    </div>
  );
};

export default EditorTable();
