import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../store/Auth"

/* This component can be used across the app to add more security
but in reality is not need it - if understand why all good then! */

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (<Redirect to={"/login"} />
                )
            }
        />
    );
};

export default PrivateRoute