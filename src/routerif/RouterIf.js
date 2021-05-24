import React from 'react';
import { Route } from 'react-router-dom';
import PageNotFound from '../pages/Error/PageNotFound';

export const ROLE = {
  NONE: 'NONE',
};

const RouteIf = ({ role, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (role === ROLE.NONE) {
          return <PageNotFound />;
        }

        if (Component) {
          return <Component {...props} role={role} />;
        }

        return null;
      }}></Route>
  );
};

export default RouteIf;
