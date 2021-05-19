import React, { useEffect } from "react";
import Wboard from "./components/MainBoard/Wboard";
import MainBoard from "./pages/Main/MainBoard";
import VideoBox from "./pages/VideoBox/VideoBox";
import "./MainWrapper.css";
import { getMainData } from "./redux/main/mainReducer";
import { useDispatch } from "react-redux";

const MainWrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMainData());
  }, [dispatch]);
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
