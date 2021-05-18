import UsernameGenarator from "username-generator";
import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { signInUser, useAuthDispatch } from "../store";


const SignUp = ({ history }) => {
  
  const dispatch = useAuthDispatch(); 
  const createUser = (name, email, password) => {
    var username =
      name.value === "" ? UsernameGenarator.generateUsername() : name.value;
    var user = { Name: username, Email: email.value, Password: password.value, Avatar:'https://avatars.dicebear.com/api/:sprites/:seed.svg' };
    return user;
  };
  const handleSigning = useCallback(
    async (event) => {
      event.preventDefault();
      const { name, email, password } = event.target.elements;
      var registerPayload = createUser(name, email, password);
      try {
        let response = await signInUser(dispatch, registerPayload);
        if (!response) return;
        history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="content">
      <form className="frame p-3" onSubmit={handleSigning}>
        <div className="frame__body p-2">
          <div className="row p-3 level fill-height">
            <div className="col-12">
              <div className="padded">
                <h3>Sign Up</h3>
                <div className="form-section">
                  <div className="input-control">
                    <input
                      className="input-contains-icon"
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                    />
                    <span className="icon">
                      <i className="far fa-wrapper fa-user-circle small"></i>
                    </span>
                  </div>
                </div>

                <div className="form-section">
                  <div className="input-control">
                    <input
                      className="input-contains-icon"
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="text"
                    />
                    <span className="icon">
                      <i className="far fa-wrapper fa-envelope-open small"></i>
                    </span>
                  </div>
                </div>
                <div className="form-section">
                  <div className="input-control">
                    <input
                      className="input-contains-icon"
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                    />
                    <span className="icon">
                      <i className="fas fa-wrapper fa-key small"></i>
                    </span>
                  </div>
                </div>

                <button
                  className="outline btn-dark"
                  name="register"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
