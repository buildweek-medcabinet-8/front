import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, username, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component {...props} username={username} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
