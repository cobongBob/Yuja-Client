import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>잘못된 페이지 입니다.</h1>
      <Link to='/'>홈으로</Link>
    </div>
  );
};

export default PageNotFound;
