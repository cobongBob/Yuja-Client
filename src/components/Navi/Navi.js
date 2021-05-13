import React, { useEffect, useState } from 'react';
import './Navi.scss';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import './SignButton.scss';
import LoginModal from '../Login-SignUp/Login/LoginModal';
import { FiMenu } from 'react-icons/fi';

const Navi = () => {
  const current = useHistory().location.state;
  const pathname = useLocation().pathname;
  const [match, setMatch] = useState(current);
  const clickLink = () => {};

  return (
    <div className='nav'>
      <ul className='nav-pills' defaultValue='/'>
        <Link to='/'>
          <li className={pathname === '/' ? 'nav-link-disabled' : 'nav-link'}>
            메인
          </li>
        </Link>
        <Link to='/Youtuber'>
          <li
            className={
              pathname === '/Youtuber' ? 'nav-link-disabled' : 'nav-link'
            }
          >
            유튜버
          </li>
        </Link>
        <Link to='/Editer'>
          <li
            className={
              pathname === '/Editer' ? 'nav-link-disabled' : 'nav-link'
            }
          >
            편집자
          </li>
        </Link>
        <Link to='/Thumbnailer'>
          <li
            className={
              pathname === '/Thumbnailer' ? 'nav-link-disabled' : 'nav-link'
            }
          >
            썸네일러
          </li>
        </Link>
        <Link to='/Winwin'>
          <li
            className={
              pathname === '/Winwin' ? 'nav-link-disabled' : 'nav-link'
            }
          >
            윈윈
          </li>
        </Link>
        <Link to='/Help'>
          <li
            className={pathname === '/Help' ? 'nav-link-disabled' : 'nav-link'}
          >
            고객센터
          </li>
        </Link>
        <li className='nav-login'>
          <LoginModal />
        </li>
      </ul>
      <button className='menu-icon'>
        <FiMenu className='menu-icon-style'></FiMenu>
      </button>
    </div>
  );
};

export default Navi;
