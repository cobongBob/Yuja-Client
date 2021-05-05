import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Container } from 'react-bootstrap';
import { FcLike } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import EditorApiService from './EditorApiService';
import './EditorTable.scss';

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
    <Container>
      <CardDeck className='editor-deck'>
        {data.map((data) => (
          <Card key={data.id} variant='top' className='editor-card'>
            <Card.Header>
              <Link>{data.user.username}</Link>
            </Card.Header>
            <Card.Title>
              <Link>{data.user.title} </Link>
            </Card.Title>
            <Card.Text> {data.user.content} </Card.Text>
            <Card.Footer>
              <p>
                <strong>마감일</strong>
              </p>
              <strong>
                {format(new Date(data.updatedDate), 'yyyy-MM-dd')}
              </strong>
              <div>
                <FcLike size={20} /> {data.likes}
              </div>
            </Card.Footer>
          </Card>
        ))}
      </CardDeck>
    </Container>
  );
};

export default EditorTable;
