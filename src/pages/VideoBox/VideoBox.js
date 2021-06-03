import React, { useMemo } from 'react';
import './VideoBox.scss';
import Evideo from '../../components/Slide/Evideo';
import Svideo from '../../components/Slide/Svideo';
import PrevArrow from '../../components/Slide/PrevArrow';
import NextArrow from '../../components/Slide/NextArrow';
const VideoBox = () => {
  const settings = useMemo(
    () => ({
      dots: false,
      arrows: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      infinite: true, // true 면 무한루트 but, 게시물이 4개 이하일경우 아래쪽으로 복사가됨 / false 면 무한루트가 안됨 but, 게시물이 4개 이하여도  아래쪽으로 복사가 안됨
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      draggable: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1720,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    []
  );
  return (
    <div className="VideoBox_Wrapper">
      <Evideo settings={settings} />
      <Svideo settings={settings} />
    </div>
  );
};

export default VideoBox;
