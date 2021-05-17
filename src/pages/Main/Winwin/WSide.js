import React from "react";
import { Link } from "react-router-dom";

const WSide = () => {
  return (
    <>
      <div className='sideMenu'>
        <h2>커뮤니티</h2>
        <br />
        <div>
          <Link to={`/Community/Winwin/1`}>윈윈</Link> <br />
          <Link to={`/Community/Collabo/1`}>합방해요</Link>
        </div>
      </div>
    </>
  );
};

export default WSide;
