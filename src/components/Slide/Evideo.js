import React from "react";
import "./video.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import { useSelector } from "react-redux";
import { RiScissorsCutFill } from "react-icons/ri";
import { useHistory } from "react-router";

const Evideo = () => {
  const history = useHistory();
  const { EvideoData } = useSelector((state) => state.mainReducer);

  const settings = {
    dots: false,
    arrows: true,
    prevArrow: <PrevArrow></PrevArrow>,
    nextArrow: <NextArrow></NextArrow>,
    infinite: true,
    autoplay: false,
    speed: 3000,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    draggable: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    onLazyLoad: true,
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
  };

  // className='EvideoWrapper'
  return (
    <React.Fragment>
      <div className='best-editor'>
        <span>
          <RiScissorsCutFill></RiScissorsCutFill>
        </span>{" "}
        인기 편집자{" "}
      </div>
      <Slider {...settings}>
        {EvideoData &&
          EvideoData.map((video, index) => (
            <div key={index} className='wrapper'>
              <div className='thumbnails'>
                <div
                  onClick={() => history.push(`EDetail/Editor/${video.id}/1`)} // 편집자 detail 완성되면 주소 바꿔줘야함
                  className='thumbnails-item'
                >
                  <div className='item item_red'>
                    <div className='top'>{video.user.nickname}</div>
                    <div className='bottom'>{video.title}</div>
                    <img className='videoImg' src={video.previewImage} alt='' />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </React.Fragment>
  );
};

export default Evideo;
