import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import youtubeChannelId from 'get-youtube-channel-id';
import { getDetailData } from '../../../../redux/board/youtube/yboardReducer';
import { useDispatch } from 'react-redux';

const Practice = ({ user }) => {
  console.log('여긴 youtubeAPI data', user);

  const [title, setTitle] = useState('');
  const [subscribers, setSubscribers] = useState('');
  const [views, setViews] = useState('');
  const [videos, setVideos] = useState('');
  const [bannerimage, setImageBannerImage] = useState(' ');
  const [desc, setDesc] = useState('');
  const [thumb, setThumb] = useState('');

  const API_KEY = 'AIzaSyDLR47w8ZGLifW0rikkDVKP68TMYIu5ywQ';

  useEffect(() => {
    if (user) {
      const url = user.youtubeUrl;
      if (url) {
        console.log(url);
        const lastIdx = url.lastIndexOf('/');
        const utubeId = url.substr(lastIdx + 1);
        fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails,brandingSettings&id=${utubeId}&key=${API_KEY}`
        )
          .then((data) => data.json())
          .then((res) => {
            console.log(111111111111111, res);
            if (res.items[0]) {
              const brand = res.items[0].brandingSettings;
              const statis = res.items[0].statistics;
              const snip = res.items[0].snippet;
              Object.keys(statis).includes('subscriberCount')
                ? setSubscribers(statis.subscriberCount)
                : setSubscribers('');
              Object.keys(snip).includes('title')
                ? setTitle(snip.title)
                : setTitle('');
              Object.keys(statis).includes('viewCount')
                ? setViews(statis.viewCount)
                : setViews('');
              Object.keys(statis).includes('videoCount')
                ? setVideos(statis.videoCount)
                : setVideos('');
              Object.keys(brand).includes('image')
                ? setImageBannerImage(brand.image.bannerExternalUrl)
                : setImageBannerImage('');
              Object.keys(snip).includes('thumbnails')
                ? setThumb(snip.thumbnails.medium.url)
                : setThumb('');
              Object.keys(brand).includes('channel')
                ? setDesc(brand.channel.description)
                : setDesc('');
              // 전부 삼항연산자로 해당 컨텐트가 없는 사람일수도있으니 확인해야함
            }
          });
      } else {
        setSubscribers('');
        setTitle('');
        setViews('');
        setVideos('');
        setImageBannerImage('');
        setThumb('');
        setDesc('');
      }
    }
  }, [user]);

  return (
    <div>
      <div>
        <div>채널명 {title}</div>
        <div>구독자수 {subscribers}</div>
        <div>조회수 {views}</div>
        <div>비디오갯수 {videos}</div>
        <div>
          베너이미지
          <img src={bannerimage} alt='' />
        </div>
        <div>
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
