import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { ToastCenter } from '../modules/ToastModule';
import PageNotFound from '../pages/Error/PageNotFound';

const RouteIf = ({ authorities, roles, component: Component, ...rest }) => {
  const { userData } = useSelector((state) => state.loginReducer);
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userData && userData.id > 0) {
          let isValidate = false;
          if (authorities && authorities.length !== 0) {
            authorities.forEach((authority) => {
              if (roles && !roles.includes(authority)) {
                isValidate = true;
                return false;
              }
            });
          } else {
            isValidate = true;
          }

          if (isValidate) {
            return <PageNotFound />;
          }

          if (Component) {
            return <Component {...props} role={authorities} />;
          }

          return null;
        } else {
          history.push('/');
          ToastCenter('로그인 해주세요!');
          // 로그인 모달을 열도록...?
          // 주소를 직접 치고 들어가면 로그인해주세요...?
        }
      }}></Route>
  );
};

export default RouteIf;
