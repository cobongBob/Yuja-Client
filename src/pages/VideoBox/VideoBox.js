import React, { useMemo } from 'react';
import './VideoBox.scss';
import Evideo from '../../components/Slide/Evideo';
import Svideo from '../../components/Slide/Svideo';
import PrevArrow from '../../components/Slide/PrevArrow';
import NextArrow from '../../components/Slide/NextArrow';
import { useSelector } from 'react-redux';
const VideoBox = () => {
  return (
    <div className="VideoBox_Wrapper">
      <Evideo />
      <Svideo />
    </div>
  );
};

export default VideoBox;
