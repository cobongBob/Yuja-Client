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
              <div className='thumbnails_'>
                <div
                  onClick={() =>
                    history.push(`/ThumbDetail/Thumb/${video.id}/1`)
                  }
                  className='thumbnails-item_'>
                  <div className='item_ item_red'>
                    <div className='top_'>{video.user.nickname}</div>
                    <div className='bottom_'>{video.title}</div>
                    <img
                      className='videoImg_'
                      src={video.previewImage}
                      alt=''
                    />
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
