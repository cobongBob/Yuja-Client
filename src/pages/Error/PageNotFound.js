import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <h1>권한이 없습니당 ^ㅡ^</h1>
      <Link to='/'>홈으로</Link>
    </div>
  );
};

export default PageNotFound;
