import React from 'react';
import './video.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import { useSelector } from 'react-redux';
import { FaPaintBrush } from 'react-icons/fa';
import { useHistory } from 'react-router';

const Svideo = () => {
  const { ThvideoData } = useSelector((state) => state.mainReducer);
  const history = useHistory();

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
    draggable: true,
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
  };
  // className='SvideoWrapper'
  return (
    <React.Fragment>
      <div className='best-thumbnailer'>
        <span>
          <FaPaintBrush></FaPaintBrush>
        </span>{' '}
        인기 썸네일러{' '}
      </div>
      <Slider {...settings}>
        {ThvideoData &&
          ThvideoData.map((video, index) => (
            <div key={index} className='wrapper'>
              <div className='thumbnails'>
                <div
                  onClick={() => history.push(`/Ydetail/${video.user.id}`)}
                  className='thumbnails-item'>
                  <div className='item item_red'>
                    <div className='top'>{video.user.nickname}</div>
                    <div className='bottom'>{video.title}</div>
                    <img src='/img/board_pic/editor_pic/thum5.png' alt='' />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </React.Fragment>
  );
};

export default Svideo;
