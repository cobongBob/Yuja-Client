import React, { useMemo } from "react";
import "./VideoBox.scss";
import Evideo from "../../components/Slide/Evideo";
import Svideo from "../../components/Slide/Svideo";
import PrevArrow from "../../components/Slide/PrevArrow";
import NextArrow from "../../components/Slide/NextArrow";
const VideoBox = () => {
  const settings = useMemo(
    () => ({
      dots: false,
      arrows: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      infinite: false,
      autoplay: false,
      speed: 3000,
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
    <div className='VideoBox_Wrapper'>
      <Evideo settings={settings} />
      <Svideo settings={settings} />
    </div>
  );
};

export default VideoBox;
