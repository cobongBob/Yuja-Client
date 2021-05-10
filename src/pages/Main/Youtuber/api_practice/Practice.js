import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import youtubeChannelId from 'get-youtube-channel-id';

const Practice = () => {
  // null 대신 " " 이렇게 주기

  const [url, setUrl] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [views, setViews] = useState(null);
  const [videos, setVideos] = useState(null);
  const [bannerimage, setImageBannerImage] = useState(' ');
  const [desc, setDesc] = useState(null);
  const [thumb, setThumb] = useState(null);

  const API_KEY = 'AIzaSyDLR47w8ZGLifW0rikkDVKP68TMYIu5ywQ';

  const handleChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

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
      구독자수 {subscribers}
      <br />
      조회수 {views}
      <br />
      비디오갯수 {videos}
      <br />
      베너이미지
      <img src={bannerimage} alt='' />
      <br />
      채널소개
      {desc}
      <br />
      섬네일 이미지
      <img src={thumb} alt='' />
    </div>
  );
};

export default Practice;
