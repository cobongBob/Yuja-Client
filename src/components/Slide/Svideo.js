import React, { useCallback, useEffect, useRef } from "react";
import "./video.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { FaPaintBrush } from "react-icons/fa";
import { useHistory } from "react-router";

const Svideo = ({ settings }) => {
  const { ThvideoData } = useSelector((state) => state.mainReducer);
  const history = useHistory();

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
      <div onClick={() => history.push("/Thboard/Thumb/1")} className='best-thumbnailer'>
        <span>
          <FaPaintBrush></FaPaintBrush>
        </span>{" "}
        인기 썸네일러{" "}
      </div>
      <Slider ref={slideDefault} {...settings}>
        {ThvideoData &&
          ThvideoData.map((video, index) => (
            <div key={index} className='wrapper'>
              <div className='thumbnails_'>
                <div onClick={() => history.push(`/ThumbDetail/Thumb/${video.id}/1`)} className='thumbnails-item_'>
                  <div className='item_ item_red'>
                    <div className='top_'>{video.user.nickname}</div>
                    <div className='bottom_'>{video.title}</div>
                    <img className='videoImg_' src={video.previewImage} alt='' />
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
