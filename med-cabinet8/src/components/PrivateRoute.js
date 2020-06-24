import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={(props) => {
        if (localStorage.getItem("login") === "true") {
          return <Component {...props} />;
        } else {
          localStorage.setItem("login", "false")
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;