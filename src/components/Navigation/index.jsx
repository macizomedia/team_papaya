import React from "react";
import { logout, useAuthState, useAuthDispatch } from "../../store/index";

export default function index({ history }) {
    const { currentUser } = useAuthState();
    const dispatch = useAuthDispatch();
    const handleLogout = () => {
        console.log("LOGIN-OUT");
        logout(dispatch);
        history.push("/");
    };
    return (
        <div className="header header-fixed unselectable header-animated header-clear">
            <div className="header-brand">
                <div className="nav-item no-hover">
                    <a href="/">
                        <h6 className="title text-yellow-300">
                            {currentUser.user !== ""
                                ? currentUser.user
                                : "Papaya"}
                        </h6>
                    </a>
                </div>
                <div className="nav-item nav-btn" id="header-btn">
                    <span></span> <span></span> <span></span>
                </div>
            </div>
            <div className="header-nav" id="header-menu">
                <div className="nav-left">
                    <div className=" nav-item text-center">
                        <a href="https://github.com/macizomedia/team_papaya">
                            <span className="icon">
                                <i
                                    className="fas fa-wrapper fa-code-branch text-yellow-300"
                                    aria-hidden="true"
                                ></i>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="nav-right ">
                    <div
                        className="nav-item has-sub toggle-hover"
                        id="dropdown"
                    >
                        {!currentUser.token ? (
                            <a href="/login">
                                <i className="fas fa-sign-in-alt"></i>
                            </a>
                        ) : (
                            <a href="#dropdown" className="text-yellow-300 nav-dropdown-link">
                                Menu
                            </a>
                        )}
                        <ul
                            className="dropdown-menu dropdown-animated"
                            role="menu"
                        >
                            <li>
                                {!currentUser.token ? (
                                    <a href="/signup">SignUp</a>
                                ) : (
                                    <a onClick={handleLogout} href="/">
                                        Logout
                                    </a>
                                )}
                            </li>
                            <li>
                                {!currentUser.token ? (
                                    <a href="/about">About</a>
                                ) : (
                                    <a href="/dashboard">My Dashboard</a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
