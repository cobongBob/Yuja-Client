import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import youtubeChannelId from 'get-youtube-channel-id';
import { getDetailData } from '../../../../redux/board/youtube/yboardReducer';
import { useDispatch } from 'react-redux';

const Practice = (data) => {
  // null 대신 " " 이렇게 주기

  const [url, setUrl] = useState('');
  const [subscribers, setSubscribers] = useState('');
  const [views, setViews] = useState('');
  const [videos, setVideos] = useState('');
  const [bannerimage, setImageBannerImage] = useState(' ');
  const [desc, setDesc] = useState('');
  const [thumb, setThumb] = useState('');

  const API_KEY = 'AIzaSyDLR47w8ZGLifW0rikkDVKP68TMYIu5ywQ';

  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  // useEffect(() => {
  //   const board_id = props.match.params.board_id;
  //   getDetailData(board_id, user_id).then((res) => {
  //     dispatch(res);
  //   });
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await youtubeChannelId(url);
    fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails,brandingSettings&id=${result.id}&key=${API_KEY}`
    )
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        const brand = result.items[0].brandingSettings;
        const statis = result.items[0].statistics;
        const snip = result.items[0].snippet;
        setSubscribers(statis.subscriberCount);
        setViews(statis.viewCount);
        setVideos(statis.videoCount);
        setImageBannerImage(brand.image.bannerExternalUrl);
        setThumb(snip.thumbnails.medium.url);
        setDesc(brand.channel.description);
        // 전부 삼항연산자로 해당 컨텐트가 없는 사람일수도있으니 확인해야함
      });
    console.log(result);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='channelUrl'>
          <Form.Label>Channel URL:</Form.Label>
          <Form.Control
            type='text'
            name='url'
            onChange={handleChange}
            value={url}
            required
            placeholder='URL'></Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          submit
        </Button>
      </Form>
      <div>
        <div>구독자수 {subscribers}</div>
        <div>조회수 {views}</div>
        <div>비디오갯수 {videos}</div>
        <div>
          베너이미지
          <img src={bannerimage} alt='' />
        </div>
        <div>
          {data.title}
          채널소개
          {desc}
        </div>
        <div>
          섬네일 이미지
          <img src={thumb} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Practice;
