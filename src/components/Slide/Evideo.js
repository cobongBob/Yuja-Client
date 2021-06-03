import React, { useCallback, useEffect, useRef } from 'react';
import './video.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { RiScissorsCutFill } from 'react-icons/ri';
import { useHistory } from 'react-router';

const Evideo = ({ settings }) => {
  const history = useHistory();
  const { EvideoData } = useSelector((state) => state.mainReducer);

  const slideDefault = useRef(null);
  const gotoDefault = useCallback((num) => {
    slideDefault.current && slideDefault.current.slickGoTo(num, false);
  },[]);
  useEffect(() => {
    slideDefault.current &&
      slideDefault.current.slickGoTo &&
      setTimeout(() => {
        gotoDefault(0);
      }, 500);
  }, []);

  return (
    <React.Fragment>
      <div
        onClick={() => history.push('/Eboard/Editor/1')}
        className="best-editor"
      >
        <span>
          <RiScissorsCutFill />
        </span>{' '}
        인기 편집자{' '}
      </div>
      <Slider ref={slideDefault} {...settings}>
        {EvideoData &&
          EvideoData.map((video, index) => (
            <div key={index} className="wrapper">
              <div className="thumbnails">
                <div
                  onClick={() => history.push(`EDetail/Editor/${video.id}/1`)}
                  className="thumbnails-item"
                >
                  <div className="item item_red">
                    <div className="top">{video.user.nickname}</div>
                    <div className="bottom">{video.title}</div>
                    <img className="videoImg" src={video.previewImage} alt="" />
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
