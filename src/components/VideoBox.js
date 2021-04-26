import React from 'react';
import './scss/VideoBox.scss';
import Evideo from './Evideo';
import Svideo from './Svideo';

const VideoBox = ({ children }) => {
  return (
    <div className='VideoBox_Wrapper'>
      <Evideo></Evideo>
      <Svideo></Svideo>
    </div>
  );
};

export default VideoBox;
