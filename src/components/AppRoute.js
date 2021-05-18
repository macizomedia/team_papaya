import React from "react";
import { Redirect, Route } from "react-router-dom";
import { CountryProvider } from "../store/CountryProvider";
import { useAuthState } from "../store/index";

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const { currentUser } = useAuthState();
  console.log(currentUser);
  return (
    <CountryProvider>

      <Route
        path={path}
        render={(props) =>
          isPrivate && !Boolean(currentUser.token) ? (
            <Redirect to={{ pathname: "/login" }} />
          ) : (
            <Component {...props} />
          )
        }
        {...rest}
      />
    </CountryProvider>
  );
};

export default AppRoutes;
