import React, { useCallback, useEffect, useRef, useState } from 'react';
import './video.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import { useDispatch, useSelector } from 'react-redux';
import { RiScissorsCutFill } from 'react-icons/ri';
import { getMainData } from '../../redux/main/mainReducer';
import { useHistory } from 'react-router';

const Evideo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { EvideoData } = useSelector((state) => state.mainReducer);
  console.log(1111111111111111, EvideoData);
  useEffect(() => {
    dispatch(getMainData());
  }, [dispatch]);

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
        </span>{' '}
        인기 편집자{' '}
      </div>
      <Slider {...settings}>
        {EvideoData.map((video) => (
          <div className='wrapper'>
            <div className='thumbnails'>
              <div
                onClick={() => history.push(`/Ydetail/${video.user.id}`)}
                className='thumbnails-item'>
                <div className='item item_red'>
                  <div className='top'>{video.user.nickname}</div>
                  <div className='bottom'>{video.title}</div>
                  <img src='/img/board_pic/editor_pic/thum7.png' alt='' />
                </div>
              </div>
            </div>
            u
          </div>
        ))}
      </Slider>
    </React.Fragment>
  );
};

export default Evideo;
