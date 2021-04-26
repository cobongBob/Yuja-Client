import React from 'react';
import './scss/Nav.scss';
import 'react-bootstrap/Nav';

const Navi = () => {
  return (
    <>
      <div className='nav'>
        <ul className='nav-pills' defaultValue='/home'>
          <li className='nav-link' href='/home'>
            메인
          </li>
          <li className='nav-link'>유튜버</li>
          <li className='nav-link'>편집자</li>
          <li className='nav-link'>썸네일러</li>
          <li className='nav-link'>윈윈</li>
          <li className='nav-link'>고객센터</li>
        </ul>
      </div>
    </>
  );
};

export default Navi;
