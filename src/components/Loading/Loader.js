import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type, color }) => {
  return (
    <div className='contentWrap'>
      <div
        style={{
          position: "fixed",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ReactLoading type={"cylon"} color={color} height={"125px"} width={"125px"} />{" "}
      </div>
    </div>
  );
};

export default Loader;
