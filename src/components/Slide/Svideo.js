import React, { useEffect } from 'react';
import './Svideo.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import { useDispatch, useSelector } from 'react-redux';
import { getMainData } from '../../redux/main/mainReducer';
import { FaPaintBrush } from 'react-icons/fa';

const Svideo = () => {
  const dispatch = useDispatch();
  const { ThvideoData } = useSelector((state) => state.mainReducer);
  console.log(222222222222222222, ThvideoData);

  useEffect(() => {
    dispatch(getMainData);
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
        {ThvideoData.map((video) => (
          <div className='wrapper'>
            <div className='thumbnails'>
              <div className='thumbnails-item'>
                <div className='item item_red'>
                  <img src='/img/board_pic/thumbnailer_pic/thum12.png' alt='' />
                  <div className='item-title'>
                    <h2>{video.user.nickname}</h2>
                  </div>
                  <div className='item-content'>
                    <p>{video.content}</p>
                  </div>
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
