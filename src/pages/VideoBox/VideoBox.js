import React from 'react';
import './VideoBox.scss';
import Evideo from '../../components/Slide/Evideo';
import Svideo from '../../components/Slide/Svideo';

const VideoBox = ({ videoData }) => {
  const EditorData = videoData[0];
  console.log(1111111111, EditorData);

  return (
    <div className='VideoBox_Wrapper'>
      <Evideo></Evideo>
      <Svideo></Svideo>
    </div>
  );
};

export default VideoBox;
