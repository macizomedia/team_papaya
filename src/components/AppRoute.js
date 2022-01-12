import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../store/index";

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const { currentUser } = useAuthState();
  console.log("from app" + JSON.stringify(currentUser, null, 2));
  return (

      <Route
        path={path}
        render={(props) =>
          isPrivate && !Boolean(currentUser.token) ? (
            <Redirect to={{ pathname: "/login" }} />
          ) : (
            <Component { ...props} />
          )
        }
        {...rest}
      />
  );
};

export default AppRoutes;
