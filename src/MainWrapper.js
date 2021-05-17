import React, { useEffect, useState } from 'react';
import Wboard from './components/MainBoard/Wboard';
import MainBoard from './pages/Main/MainBoard';
import VideoBox from './pages/VideoBox/VideoBox';
import './MainWrapper.css';
import { getfetchMainData } from './apiService/MainApiService';

const MainWrapper = () => {
  const [videoData, setvideoData] = useState([]);
  const [mainBoardData, setMainBoardData] = useState([]);
  const [communityData, setCommunityData] = useState([]);

  useEffect(() => {
    getfetchMainData().then((res) => {
      console.log(res);
      setvideoData([res.data.editLikes12, res.data.thumbLikes12]);
      setMainBoardData([
        res.data.youUpdatedOrder4,
        res.data.editUpdatedOrder4,
        res.data.thumUpdatedOrder4,
      ]);
      setCommunityData([res.data.colcreatedOrder5, res.data.wincreatedOrder5]);
    });
  }, []);

  return (
    <>
      <div className='allBoard'>
        <VideoBox videoData={videoData}></VideoBox>
        <MainBoard mainBoardData={mainBoardData}></MainBoard>
        <Wboard communityData={communityData}></Wboard>
      </div>
    </>
  );
};

export default MainWrapper;
