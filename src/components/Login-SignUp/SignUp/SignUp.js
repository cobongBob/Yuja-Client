import React from "react";
import "./SignUp.scss";
import Agreement from "./Agreement";
import Switch from "react-bootstrap/Switch";
import { Link, Route } from "react-router-dom";
import NonRequired from "./NonRequired";
import Required from "./Required";
import { ToastPreventAccess } from "../../../modules/ToastModule";

const SignUp = ({ location, history, match }) => {

  if (history.action === "POP") {
    ToastPreventAccess("❌ 잘못된 접근 입니다.");
    history.replace("/");
  }

  return (
    <div className='SignUpFrag'>
      <header className='SignUpHeader'>
        <Link className='header-title' to='/'>
          유자 회원가입
        </Link>
      </header>
        <div className='contentBox'>
          <Switch>
            <Route
              exact
              path='/SignUp'
              component={Agreement}
              googleSignupData={location.resData === undefined ? null : location.resData.res}
            />
            <Route path='/SignUp/Required' component={Required} />
            <Route path='/SignUp/NonRequired' component={NonRequired} />
          </Switch>
        </div>
      <footer className='SignUpFooter'>
        <Link className='linkToMain' to='/'>
          이미 회원이신가요? <span>로그인</span>
        </Link>
      </footer>
    </div>
  );
};

export default SignUp;
