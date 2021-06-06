import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Winwin.scss';

const WSide = () => {
  const pathname = useLocation().pathname;
  return (
    <>
      <div className='sideMenu'>
        <div className='sideMenu-title'>커뮤니티</div>
        <div>
          <ul className='sideUl'>
            <Link to={`/Community/Winwin/1`}>
              <li
                className={
                  pathname.includes('/Winwin')
                    ? 'li-link-disabled'
                    : 'li-winwin'
                }
              >
                채널성장
              </li>
            </Link>
            <Link to={`/Community/Collabo/1`}>
              <li
                className={
                  pathname.includes('/Collabo')
                    ? 'li-link-disabled'
                    : 'li-winwin'
                }
              >
                합방제안
              </li>
            </Link>
            <Link to={`/Community/Free/1`}>
              <li
                className={
                  pathname.includes('/Free') ? 'li-link-disabled' : 'li-winwin'
                }
              >
                자유게시판
              </li>
            </Link>
            <Link to={`/Community/CustomService/1`}>
              <li
                className={
                  pathname.includes('/CustomService')
                    ? 'li-link-disabled'
                    : 'li-winwin'
                }
              >
                건의게시판
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WSide;
