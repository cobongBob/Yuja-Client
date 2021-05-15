import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ChannelBox.scss";
const ChannelBox = () => {
  // console.log("여긴 youtubeAPI data", detailData);
  const { detailData } = useSelector((state) => state.YboardReducer);
  const [title, setTitle] = useState("");
  const [subscribers, setSubscribers] = useState("");
  const [videos, setVideos] = useState("");
  // const [views, setViews] = useState('');
  // const [bannerimage, setImageBannerImage] = useState(' ');
  const [desc, setDesc] = useState("");
  const [thumb, setThumb] = useState("");

  const API_KEY = "AIzaSyDLR47w8ZGLifW0rikkDVKP68TMYIu5ywQ";

  useEffect(() => {
    if (detailData && detailData.id !== 0) {
      setSubscribers("");
      setTitle("");
      setVideos("");
      setThumb("");
      setDesc("");
      const url = detailData.user.youtubeUrl;
      if (url) {
        const lastIdx = url.lastIndexOf("/");
        const utubeId = url.substr(lastIdx + 1);
        fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails,brandingSettings&id=${utubeId}&key=${API_KEY}`
        )
          .then((data) => data.json())
          .then((res) => {
            if (res.items[0]) {
              const brand = res.items[0].brandingSettings;
              const statis = res.items[0].statistics;
              const snip = res.items[0].snippet;
              Object.keys(statis).includes("subscriberCount")
                ? setSubscribers(statis.subscriberCount)
                : setSubscribers("");
              Object.keys(snip).includes("title") ? setTitle(snip.title) : setTitle("");
              // Object.keys(statis).includes('viewCount')
              //   ? setViews(statis.viewCount)
              //   : setViews('');
              Object.keys(statis).includes("videoCount") ? setVideos(statis.videoCount) : setVideos("");
              // Object.keys(brand).includes('image')
              //   ? setImageBannerImage(brand.image.bannerExternalUrl)
              //   : setImageBannerImage('');
              Object.keys(snip).includes("thumbnails") ? setThumb(snip.thumbnails.medium.url) : setThumb("");
              Object.keys(brand).includes("channel") ? setDesc(brand.channel.description) : setDesc("");
              // 전부 삼항연산자로 해당 컨텐트가 없는 사람일수도있으니 확인해야함
            }
          })
          .catch((e) => {
            console.log(e);
            console.log("잘못된 유튜브 요청주소");
          });
      } else {
        setSubscribers("");
        setTitle("");
        // setViews('');
        setVideos("");
        // setImageBannerImage('');
        setThumb("");
        setDesc("");
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
          {detailData && detailData.user ? (
            <a target='blank' href={detailData.user.youtubeUrl}>
              {title}
            </a>
          ) : null}
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
      </div>
      <div className='DefaultInfoWrapper'>
        <div className='DefaultInfo'>
          <ul>
            <li>
              <span>
                <strong>"{detailData.worker}" </strong>
              </span>
              <label htmlFor=''>구합니다.</label>
            </li>
            <li>
              <span>{detailData.career}</span>
            </li>
            <li>
              <span>{detailData.payType} / </span>
              <span>{detailData.payAmount}원</span>
            </li>
            <li>
              <span>편집tool</span>
              <br />
              {detailData &&
                detailData.tools &&
                detailData.tools.map((tool, idx) => (
                  <label key={idx} htmlFor=''>
                    {idx < detailData.tools.length - 1 ? <span> {tool} /&nbsp;</span> : <span>{tool}</span>}
                  </label>
                ))}
            </li>
            <li>
              <span>담당자 : </span>
              <span>{detailData.manager}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChannelBox;
