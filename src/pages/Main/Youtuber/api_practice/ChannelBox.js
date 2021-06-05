import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastCenter } from "../../../../modules/ToastModule";
import "./ChannelBox.scss";
const ChannelBox = () => {
  const { detailData } = useSelector((state) => state.YboardReducer);
  const [title, setTitle] = useState("");
  const [subscribers, setSubscribers] = useState("");
  const [videos, setVideos] = useState("");
  const [desc, setDesc] = useState("");
  const [thumb, setThumb] = useState("");

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_V3;
    if (detailData && detailData.id !== 0) {
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
              Object.keys(statis).includes("videoCount") ? setVideos(statis.videoCount) : setVideos("");
              Object.keys(snip).includes("thumbnails") ? setThumb(snip.thumbnails.medium.url) : setThumb("");
              Object.keys(brand).includes("channel") ? setDesc(brand.channel.description) : setDesc("");
            }
          })
          .catch((e) => {
            ToastCenter("잘못된 유튜브 요청주소");
          });
      } else {
        setSubscribers("");
        setTitle("");
        setVideos("");
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
        <div className='ChannelBoxTitleWrapper'>
          {detailData && detailData.user ? (
            <a target='blank' href={detailData.user.youtubeUrl}>
              {title}
            </a>
          ) : null}
        </div>
        <div className='SVWrapper'>
          <span className='SubscribeCount'>
            구독자: {subscribers.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}명
          </span>
          <span className='VideoCount'>영상수: {videos.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>
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
                <strong className='ChannelBoxDetailTitle'>모집분야</strong> {detailData.worker}
              </span>
            </li>
            <li>
              <span>
                <strong className='ChannelBoxDetailTitle'>모집자격</strong> {detailData.career}
              </span>
            </li>
            <li>
              <span>
                <strong className='ChannelBoxDetailTitle'>모집인원</strong> {detailData.recruitingNum}명
              </span>
            </li>
            <li>
              <span>
                <strong className='ChannelBoxDetailTitle'>{detailData.payType}</strong> {detailData.payAmount}원
              </span>
            </li>
            <li>
              <span>
                <strong className='ChannelBoxDetailTitle'>사용기술</strong>{" "}
                {detailData && detailData.tools && detailData.tools.join(", ")}
              </span>
            </li>
            <li>
              <strong className='ChannelBoxDetailTitle'>담당자</strong> <span>{detailData.manager}</span>
            </li>
            <li>
              <strong className='ChannelBoxDetailTitle'>담당자 연락처</strong> <span>{detailData.receptionMethod}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChannelBox;
