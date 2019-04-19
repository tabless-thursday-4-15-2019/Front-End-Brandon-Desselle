import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// --- PrivateRoute component

const PrivateRoute = ({
  component: Component,
  token,
  errorStatusCode,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.loggedIn && errorStatusCode !== 403 ? (
          <Component {...props} />
        ) : (
            <Redirect to="/" />
          )
      }
    />
  );
};

const mapStateToProps = ({ token, errorStatusCode, loggedIn }) => ({
  errorStatusCode,
  token,
  loggedIn
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(PrivateRoute)
);