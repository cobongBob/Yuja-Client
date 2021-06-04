import './VideoBox.scss';
import Evideo from '../../components/Slide/Evideo';
import Svideo from '../../components/Slide/Svideo';

const VideoBox = () => {
  return (
    <div className="VideoBox_Wrapper">
      <Evideo />
      <Svideo />
    </div>
  );
};

export default VideoBox;
