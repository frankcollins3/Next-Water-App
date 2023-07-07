import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {

  const auth = localStorage.getItem('WAPPTOKEN');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
