import React from "react";
import './InfoModify.scss';
import { Link, Route } from 'react-router-dom';
import Switch from 'react-bootstrap/Switch';
import Agreement from '../Login-SignUp/SignUp/Agreement';
import Required from '../Login-SignUp/SignUp/Required';
import NonRequired from '../Login-SignUp/SignUp/NonRequired';

const InfoModify = () => {

  return (
    <div className='SignUpFrag'>
      <header className='SignUpHeader'>
        {/*<img className="SignUpIcon" src="/img/parts_pic/yuzu05.png" />{" "}*/}
        <Link className='header-title' to='/'>
          유자 회원정보 수정
        </Link>
      </header>
      <content>
        <div className='contentBox'>
          <Switch>
            <Route
              exact
              path='/SignUp1'
              component={Agreement}
              googleSignupData={location.resData === undefined ? null : location.resData.res}
            />
            <Route path='/SignUp1/Required' component={Required} />
            <Route path='/SignUp1/NonRequired' component={NonRequired} />
          </Switch>
        </div>
      </content>
      <footer className='SignUpFooter'>

      </footer>
    </div>
  );

};

export default InfoModify;