import React from "react";
import "./Youtuber.scss";
import Ylist from "./Ylist";
// nav에서 유튜버를 누르면 보이는 전체 컴포넌트
const Youtuber = () => {
  return (
    <div className='YtableWrapper'>
      <Ylist></Ylist>
    </div>
  );
};

export default Youtuber;
