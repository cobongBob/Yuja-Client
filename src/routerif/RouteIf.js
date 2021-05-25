import React from 'react';
import { Route } from 'react-router-dom';
import PageNotFound from '../pages/Error/PageNotFound';

const RouteIf = ({ authorities, roles, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        let isValidate = false;
        if (authorities.length !== 0) {
          authorities.forEach((authority) => {
            if (!roles.includes(authority)) {
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
      }}></Route>
  );
};

export default RouteIf;
