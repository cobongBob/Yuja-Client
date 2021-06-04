import React, { useCallback, useEffect, useMemo, useRef } from "react";
import "./video.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { RiScissorsCutFill } from "react-icons/ri";
import { useHistory } from "react-router";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";

const Evideo = () => {
  const history = useHistory();
  const { EvideoData } = useSelector((state) => state.mainReducer);

  const settings = useMemo(
    () => ({
      dots: false,
      arrows: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      infinite: EvideoData.length > 4 ? true : false, // true 면 무한루트 but, 게시물이 4개 이하일경우 아래쪽으로 복사가됨 / false 면 무한루트가 안됨 but, 게시물이 4개 이하여도  아래쪽으로 복사가 안됨
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
    [EvideoData]
  );

  const slideDefault = useRef(null);
  const gotoDefault = useCallback((num) => {
    slideDefault.current && slideDefault.current.slickGoTo(num, false);
  }, []);
  useEffect(() => {
    slideDefault.current &&
      slideDefault.current.slickGoTo &&
      setTimeout(() => {
        gotoDefault(0);
      }, 500);
  }, [gotoDefault]);

  return (
    <React.Fragment>
      <div onClick={() => history.push("/Eboard/Editor/1")} className='best-editor'>
        <span>
          <RiScissorsCutFill />
        </span>{" "}
        인기 편집자{" "}
      </div>
      <Slider ref={slideDefault} {...settings}>
        {EvideoData &&
          EvideoData.map((video, index) => (
            <div key={index} className='wrapper'>
              <div className='thumbnails'>
                <div onClick={() => history.push(`EDetail/Editor/${video.id}/1`)} className='thumbnails-item'>
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
