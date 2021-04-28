import React from 'react';
import './scss/Navi.scss';
import { Link } from 'react-router-dom';
import SignButton from './SignButton';
import './scss/SignButton.scss';
import LoginModal from './LoginModal';
import LoginModal2 from './LoginModal2';

const Navi = () => {
  return (
    <>
      <div className='nav'>
        <ul className='nav-pills' defaultValue='/'>
          <Link to='/'>
            <li className='nav-link'>메인</li>
          </Link>
          <Link to='/Youtuber'>
            <li className='nav-link'>유튜버</li>
          </Link>
          <Link to='/Editer'>
            <li className='nav-link'>편집자</li>
          </Link>
          <Link to='/Thumbnailer'>
            <li className='nav-link'>썸네일러</li>
          </Link>
          <Link to='/Winwin'>
            <li className='nav-link'>윈윈</li>
          </Link>
          <Link to='/Help'>
            <li className='nav-link'>고객센터</li>
          </Link>
          <div className='nav-login'>
            <LoginModal2 />
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navi;
