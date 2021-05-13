import React, { useEffect, useState } from 'react';
import './ChannelBox.scss';
const ChannelBox = ({ detailData }) => {
  console.log('여긴 youtubeAPI data', detailData);

  const [title, setTitle] = useState('');
  const [subscribers, setSubscribers] = useState('');
  const [videos, setVideos] = useState('');
  // const [views, setViews] = useState('');
  // const [bannerimage, setImageBannerImage] = useState(' ');
  const [desc, setDesc] = useState('');
  const [thumb, setThumb] = useState('');

  const API_KEY = 'AIzaSyDLR47w8ZGLifW0rikkDVKP68TMYIu5ywQ';

  useEffect(() => {
    if (detailData) {
      console.log(123123123123213, detailData);
      const url = detailData.user.youtubeUrl;
      console.log(4444444444444444444, url);
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
              // Object.keys(statis).includes('viewCount')
              //   ? setViews(statis.viewCount)
              //   : setViews('');
              Object.keys(statis).includes('videoCount')
                ? setVideos(statis.videoCount)
                : setVideos('');
              // Object.keys(brand).includes('image')
              //   ? setImageBannerImage(brand.image.bannerExternalUrl)
              //   : setImageBannerImage('');
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
        // setViews('');
        setVideos('');
        // setImageBannerImage('');
        setThumb('');
        setDesc('');
      }
    }
  }, [detailData]);

  return (
    <div className='ChannelBigWrapper'>
      <div className='ChannelBoxWrapper'>
        <div className='ChannelThumbnail'>
          <img src={thumb} alt='' />
        </div>
        <div className='TitleWrapper'>
          <h1 className='ChannelTitle'>{title}</h1>
        </div>
        <div className='SVWrapper'>
          <span className='SubscribeCount'>구독자: {subscribers}명</span>
          <span className='VideoCount'>영상수: {videos}</span>
        </div>
        <div className='DCWraapper'>
          <div className='DescWrapper'>
            <p className='ChannelDesc'>{desc}</p>
          </div>
        </div>
        {/* <div className='ChannelBannerImage'>
          <img src={bannerimage} alt='' />
        </div> */}
        {/* <div className='ChannelHit'>조회수 {views}</div> */}
      </div>
    </div>
  );
};

export default ChannelBox;
