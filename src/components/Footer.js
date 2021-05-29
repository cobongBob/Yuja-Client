import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer className='site-footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <h6>About</h6>
            <p className='text-justify'>유튜버와 편집자, 썸네일러의 자유로운 소통창구</p>
            <h6>Contact</h6>
            <p className='text-justify'>YujaService@gmail.com</p>
          </div>

          <div className='col-xs-6 col-md-3'>
            <h6>Member's GitHub</h6>
            <table className='footer-links'>
              <tbody>
                <tr>
                  <td>
                    <a target='blank' href={"https://github.com/Jinseobex"}>
                      김진섭
                    </a>
                  </td>
                  <td>
                    <a target='blank' href={"https://github.com/kiteho8962"}>
                      서연호
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a target='blank' href={"https://github.com/sukhyunil"}>
                      석현일
                    </a>
                  </td>
                  <td>
                    <a target='blank' href={"https://github.com/jyoo0323"}>
                      유종현
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a target='blank' href={"https://github.com/jongmin4943"}>
                      윤종민
                    </a>
                  </td>
                  <td>
                    <a target='blank' href={"https://github.com/ChoiJaeYeon"}>
                      최재연
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='col-xs-6 col-md-3'>
            <h6>Quick Links</h6>
            <table className='footer-links'>
              <tbody>
                <tr>
                  <td>
                    <Link to='/'>메인</Link>
                  </td>
                  <td>
                    <Link to='/Youtuber/1'>유튜버</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to='/Eboard/Editor/1'>편집자</Link>
                  </td>

                  <td>
                    <Link to='/Thboard/Thumb/1'>썸네일러</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to='/Community/Winwin/1'>커뮤니티</Link>
                  </td>

                  <td>
                    <Link to='/Help'>고객센터</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-sm-6 col-xs-12'>
            <p className='copyright-text'>Copyright &copy; 2021 All Rights Reserved by CobongBob</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
