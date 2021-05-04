import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import { FcLike, FcOk } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import YapiService from './YapiService';
import './Ylist.scss';

const Ylist = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    YapiService.fetchBoards().then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className='YlistWrapper'>
      {data.map((data) => (
        <Card
          key={data.id}
          variant='top'
          className='text-center p-3'
          border='danger'
          style={{ width: '18rem', display: 'inline-block', margin: 'auto' }}>
          <Card.Img src='/img/board_pic/thumbnailer_pic/thum3.PNG'></Card.Img>
          <Card.Header>
            <Link>{data.user.username}</Link>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <Link to='/Ydetail/:id'>{data.title}</Link>
            </Card.Title>
            <hr />
            <ol>
              <li>
                <Card.Text>{data.content}</Card.Text>
              </li>
              <li>
                <Card.Text>{data.content}</Card.Text>
              </li>
              <li>
                <Card.Text>{data.content}</Card.Text>
              </li>
              <li>
                <Card.Text>{data.content}</Card.Text>
              </li>
            </ol>
          </Card.Body>
          <Card.Footer>
            <p>
              <strong>마감일</strong>
            </p>
            <strong>{format(new Date(data.updatedDate), 'yyyy-MM-dd')}</strong>
            <div>
              <FcLike size={20} /> {data.likes}
            </div>
          </Card.Footer>
        </Card>
      ))}
      <br />
    </div>
  );
};

export default Ylist;
