import UsernameGenarator from "username-generator";
import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import { signInUser, useAuthDispatch } from "../store";

const SignUp = ({ history }) => {
    const [inProp, setInProp] = useState(false);
    const dispatch = useAuthDispatch();
    const createUser = (name, email, password, gender) => {
        var username =
            name.value === ""
                ? UsernameGenarator.generateUsername()
                : name.value;
        var user = {
            Name: username,
            Email: email.value,
            Password: password.value,
            Avatar: `https://avatars.dicebear.com/api/${
                gender.value === "male" ? "male" : "female"
            }/`,
            List: [],
        };
        return user;
    };
    const handleSigning = useCallback(
        async (event) => {
            event.preventDefault();
            const { name, email, password, gender } = event.target.elements;
            var registerPayload = createUser(name, email, password, gender);
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
        <div className="content card">
            <form className="frame p-3" onSubmit={handleSigning}>
                <div className="frame__body p-2">
                    <div className="row p-3 level fill-height">
                        <div className="col-12">
                            <div className="padded">
                                <div>
                                    <h3>Sign Up</h3>
                                    <hr></hr>
                                    <div className="form-section">
                                        <h5 classNames="my-node">
                                            We will create your avatar as...
                                        </h5>
                                        <div className="input-control">
                                            <span className="icon">
                                                <i className="fas fa-venus-mars"></i>
                                            </span>
                                            <label>
                                                <input
                                                    onChange={(e) =>
                                                        console.log(
                                                            e.preventDefault
                                                        )
                                                    }
                                                    value="male"
                                                    type="radio"
                                                    name="gender"
                                                />{" "}
                                                Male
                                            </label>
                                            <label>
                                                <input
                                                    onChange={(e) =>
                                                        console.log(
                                                            e.preventDefault
                                                        )
                                                    }
                                                    value="female"
                                                    type="radio"
                                                    name="gender"
                                                />{" "}
                                                Female
                                            </label>
                                            <label>
                                                <input
                                                    onChange={(e) =>
                                                        console.log(
                                                            e.preventDefault
                                                        )
                                                    }
                                                    value="other"
                                                    type="radio"
                                                    name="gender"
                                                />{" "}
                                                Robot
                                            </label>
                                        </div>
                                    </div>
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
                                </div>
                                <div>
                                    <button
                                        name="register"
                                        className="outline btn-dark"
                                        type="submit"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default withRouter(SignUp);
