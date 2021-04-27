import React from 'react';
<<<<<<< HEAD
import 'react-bootstrap/Nav';
import './scss/Navi.scss';
import 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import SignButton from './SignButton';
=======
import './scss/Navi.scss';
import { Link } from 'react-router-dom';
import SignButton from './SignButton';
import './scss/SignButton.scss';
>>>>>>> 13553af6f1a75be9c43c2fef8dd6abf3af476026

const Navi = () => {
  return (
    <>
      <div className='nav'>
<<<<<<< HEAD
        <ul className='nav-pills' defaultValue='/home'>
          <li className='nav-link'>
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
          <li className='nav-link'>
            {' '}
            <Link to='/SignUp'>
              <SignButton />
            </Link>{' '}
          </li>
=======
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
            <SignButton />
          </div>
>>>>>>> 13553af6f1a75be9c43c2fef8dd6abf3af476026
        </ul>
      </div>
    </>
  );
};

export default Navi;
