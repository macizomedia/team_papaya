import React, { useState } from "react";
import { loginUser, useAuthState, useAuthDispatch } from "../store/index";

function Login({history}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch(); 
  const { loading, errorMessage } = useAuthState(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    let payload = { email, password };

    try {
      let response = await loginUser(dispatch, payload);
      if (!response) return;
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content p-2">
      <div className="card">
        <h1>Login Page</h1>
        {errorMessage ? <p className="text-danger">{errorMessage}</p> : null}
        <form className="frame p-3">
          <div className="card__container">
            <div className="form-section">
              <label htmlFor="email">Username</label>
              <input
                className="input-control"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <button onClick={handleLogin} disabled={loading}>
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
