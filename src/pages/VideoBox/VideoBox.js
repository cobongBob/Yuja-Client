import React from 'react';
import './VideoBox.scss';
import Evideo from '../../components/Slide/Evideo';
import Svideo from '../../components/Slide/Svideo';

const VideoBox = ({ children }) => {
  return (
    <div className='VideoBox_Wrapper'>
      <Evideo></Evideo>
      <Svideo></Svideo>
    </div>
  );
};

export default VideoBox;
