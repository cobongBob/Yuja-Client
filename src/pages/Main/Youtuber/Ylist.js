import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
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
          <Card.Img src='thum3.PNG'></Card.Img>
          <Card.Header>{data.user.username}</Card.Header>
          <Card.Body>
            <Card.Title>
              <Link to='/Ydetail/:id'>{data.title}</Link>
            </Card.Title>
            <hr />
            <Card.Text>{data.content}</Card.Text>
            <Card.Text>{data.content}</Card.Text>
            <Card.Text>{data.content}</Card.Text>
            <Card.Text>{data.content}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <label htmlFor=''>마감일? 등록일?</label>
            {format(new Date(data.updatedDate), 'yyyy-MM-dd')}
          </Card.Footer>
        </Card>
      ))}
      <br />
    </div>
  );
};

export default Ylist;
