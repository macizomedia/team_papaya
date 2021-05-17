import React from "react";
import { Link, Router } from "react-router-dom";
import { useAuthState } from "../../store/index";

const Home = ({ history }) => {
  const { currentUser } = useAuthState()
  return (
    <>
      <h1>ADMIN</h1>
      <Router history={history}>
        <p>Currently logged as {currentUser.user}</p>

        <Link to="/">Homepage</Link>
      </Router>
    </>
  );
};

export default Home;
