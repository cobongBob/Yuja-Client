import React from 'react';
import './Navi.scss';
import { Link, useLocation } from 'react-router-dom';
import './SignButton.scss';
import LoginModal from '../Login-SignUp/Login/LoginModal';
import { useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Navi = ({ allNotifications, setModalIsOpen }) => {
  const pathname = useLocation().pathname;
  const { authorities } = useSelector((state) => state.loginReducer);
  return (
    <div className="nav">
      <Navbar className="NavWrapper" collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand>
          <LoginModal
            allNotifications={allNotifications}
            setModalIsOpen={setModalIsOpen}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">
              <Link to="/">
                <li
                  className={
                    pathname === '/' ? 'nav-link-disabled' : 'nav-link'
                  }
                >
                  메인
                </li>
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/Youtuber/1">
                <li
                  className={
                    pathname.includes('/Youtuber') ||
                    pathname.includes('/Ydetail') ||
                    pathname.includes('/YoutuberRegister') ||
                    pathname.includes('/YboardModify')
                      ? 'nav-link-disabled'
                      : 'nav-link'
                  }
                >
                  유튜버
                </li>
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/Eboard/Editor/1">
                <li
                  className={
                    pathname.includes('/Editor')
                      ? 'nav-link-disabled'
                      : 'nav-link'
                  }
                >
                  편집자
                </li>
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/Thboard/Thumb/1">
                <li
                  className={
                    pathname.includes('/Thumb')
                      ? 'nav-link-disabled'
                      : 'nav-link'
                  }
                >
                  썸네일러
                </li>
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/Community/Winwin/1">
                <li
                  className={
                    pathname.includes('/Community') ||
                    pathname.includes('/BoardDetail') ||
                    pathname.includes('/BoardModify')
                      ? 'nav-link-disabled'
                      : 'nav-link'
                  }
                >
                  커뮤니티
                </li>
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to="/Help">
                <li
                  className={
                    pathname === '/Help' ? 'nav-link-disabled' : 'nav-link'
                  }
                >
                  고객센터
                </li>
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              {authorities && authorities.includes('ADMIN') && (
                <>
                  <Link to="/Admin/AdminUsers">
                    <li
                      className={
                        pathname.includes('/Admin')
                          ? 'nav-link-disabled'
                          : 'nav-link'
                      }
                    >
                      관리페이지
                    </li>
                  </Link>
                </>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navi;
