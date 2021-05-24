import React from 'react';
import { Route } from 'react-router-dom';
import PageNotFound from '../pages/Error/PageNotFound';

const RouteIf = ({ authorities, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          !(authorities.includes('YOUTUBER') || authorities.includes('ADMIN'))
        ) {
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
