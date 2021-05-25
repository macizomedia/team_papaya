import React, { useState } from "react";
import { loginUser, useAuthState, useAuthDispatch } from "../store/index";

/* On this component we need to make the toast Element close when clicked x
Perhaps also implement other type of validation and in general make it more 
user friendly as well as more modern look and feel check gitKraken board for more details */

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch(); // We use our encapsuled custom hook to dispatch actions

  const { currentUser } = useAuthState(); // We get access to user Context with this Custom Hook


  const handleLogin = async (e) => {
    e.preventDefault();

    let payload = { email, password };

    try {
      let response = await loginUser(dispatch, payload); // dispatch is an object that will have a type (check Reducer)
      if (!response) return;
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content p-2">
      <div className="card">
        <h1 className="title">Login</h1>
        <form className="frame p-3">
          <div className="card__container">
            <div className="card__header">
              <p>Welcome again</p>
            </div>
            <div className="card__content mt-3">


              <div className="form-section">
                <label htmlFor="email">Username</label>
                <input
                  className="input-control"
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={currentUser.loading}
                />
                {currentUser.errorMessage ? (
                  <div class="toast toast--danger">
                    <button class="btn-close"></button>
                    <p>{currentUser.errorMessage}</p>
                  </div>
                ) : null}
              </div>
              <div className="input-control">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={currentUser.loading}
                />
              </div>
            </div>
          </div>
          // TODO 
          {/* Add forgot password */}
          {/* Add Already have an account option*/}
          <button onClick={handleLogin} disabled={currentUser.loading}>
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
