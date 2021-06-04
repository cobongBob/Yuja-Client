import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import "./Logo.scss";

const Logo = ({ children, history }) => {
  const goHome = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <div className='Logo_Head'>
      <div className='Logo_Body'>
        <div className='Logo_Top'>
          <div className='Logo_desc' onClick={goHome}>
            유튜브와 <br />
            자유롭게
          </div>
        </div>
        <div className='Logo_Under'>
          <img src={process.env.PUBLIC_URL + "/img/parts_pic/YujaLogo.png"} width='150' alt='logo' onClick={goHome} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Logo);
