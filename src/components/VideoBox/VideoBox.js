import './VideoBox.scss';
import Evideo from './Evideo';
import Svideo from './Svideo';

const VideoBox = () => {
  return (
    <div className="VideoBox_Wrapper">
      <Evideo />
      <Svideo />
    </div>
  );
};

export default VideoBox;
