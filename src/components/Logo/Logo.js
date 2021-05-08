import React from "react";
import "./Logo.scss";

const Logo = ({ children }) => {
  return (
    <div className='Logo_Head'>
      <div className='Logo_Body'>
        <div className='Logo_Top'>
          <div>
            유튜브와 <br />
            자유롭게
          </div>
        </div>
        <div className='Logo_Under'>
          <img src={process.env.PUBLIC_URL + "/img/parts_pic/yuzu05.png"} width='150' alt='logo' />
        </div>
      </div>
    </div>
  );
};

export default Logo;
