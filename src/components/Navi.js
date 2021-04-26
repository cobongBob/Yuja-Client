import React from 'react';
import './scss/Navi.scss';
import 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navi = () => {
  return (
    <>
      <div className='nav'>
        <ul className='nav-pills' defaultValue='/home'>
          <li className='nav-link' href='/home'>
            <Link to='/'>메인</Link>
          </li>
          <li className='nav-link'>
            {' '}
            <Link to='/Youtuber'>유튜버</Link>{' '}
          </li>
          <li className='nav-link'>
            {' '}
            <Link to='/Editer'>편집자</Link>{' '}
          </li>
          <li className='nav-link'>
            {' '}
            <Link to='/Thumbnailer'>썸네일러</Link>{' '}
          </li>
          <li className='nav-link'>
            {' '}
            <Link to='/Winwin'>윈윈</Link>{' '}
          </li>
          <li className='nav-link'>
            {' '}
            <Link to='/Help'>고객센터</Link>{' '}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navi;
