import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ToastCenter } from "../../modules/ToastModule";

const Admin_main = () => {
  const { userData, authorities } = useSelector((state) => state.loginReducer);
  const history = useHistory();
  useEffect(() => {
    if (authorities && !authorities.includes("ADMIN")) {
      ToastCenter("잘못 된 접근입니다");
      history.goBack();
    }
  }, [authorities, history]);

  return (
    <div>
      <h1>어드민페이지</h1>
    </div>
  );
};

export default Admin_main;
