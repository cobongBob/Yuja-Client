import React, { useEffect } from "react";
import Wboard from "./components/MainBoard/Wboard";
import MainBoard from "./pages/Main/MainBoard";
import VideoBox from "./pages/VideoBox/VideoBox";
import "./MainWrapper.css";
import { getMainData } from "./apiService/MainApiService";

const MainWrapper = () => {
  useEffect(() => {
    getMainData().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <>
      <div className='allBoard'>
        <VideoBox></VideoBox>
        <MainBoard></MainBoard>
        <Wboard></Wboard>
      </div>
    </>
  );
};

export default MainWrapper;
