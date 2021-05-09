import React from "react";
import "./SignUp1.scss";
import Agreement from "./Agreement";
import Switch from "react-bootstrap/Switch";
import { Link, Route } from "react-router-dom";
import NonRequired from "./NonRequired";
import Required from "./Required";

const SignUp1 = () => {
  return (
    <div className='SignUpFrag'>
      <header className='SignUpHeader'>
        {/*<img className="SignUpIcon" src="/img/parts_pic/yuzu05.png" />{" "}*/}
        <div className='header-title'>유자 회원가입</div>
        {/*<div className="signUpBar">*/}
        {/*  <div className="bar1"></div>*/}
        {/*  <div className="bar2"></div>*/}
        {/*  <div className="bar3"></div>*/}
        {/*  <div className="bar4"></div>*/}
        {/*  <div className="mvBar"></div>*/}
        {/*</div>*/}
      </header>
      <content>
        <div className='contentBox'>
          <Switch>
            <Route exact path='/SignUp1' component={Agreement} />
            <Route path='/SignUp1/Required' component={Required} />
            <Route path='/SignUp1/NonRequired' component={NonRequired} />
          </Switch>
        </div>
      </content>
      <footer className='SignUpFooter'>
        <Link className='linkToMain' to='/'>
          이미 회원이신가요? <span>로그인</span>
        </Link>
      </footer>
    </div>
  );
};

export default SignUp1;
