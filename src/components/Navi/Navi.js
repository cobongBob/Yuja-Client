import React from 'react';
import './Navi.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './SignButton.scss';
import LoginModal from '../Login-SignUp/Login/LoginModal';
import { FiMenu } from 'react-icons/fi';

const Navi = () => {
  const history = useHistory();
  console.log(1111111111111111111111111111, history.location.pathname);
  return (
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
