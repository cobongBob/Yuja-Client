import React from "react";
import Wboard from "./components/MainBoard/Wboard";
import MainBoard from "./pages/Main/MainBoard";
import VideoBox from "./pages/VideoBox/VideoBox";
import "./MainWrapper.css";

const MainWrapper = () => {
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
