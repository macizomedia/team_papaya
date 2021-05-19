import React from "react";
import { logout, useAuthState, useAuthDispatch } from "../../store/index";
import papaya from "../../img/papaya_Logo.png";

export default function index({ history }) {
    const { currentUser } = useAuthState();
    const dispatch = useAuthDispatch();
    const handleLogout = () => {
        console.log("LOGIN-OUT");
        logout(dispatch);
        history.push("/");
    };
    return (
        <div className="header header-fixed unselectable header-animated">
            <div className="header-brand">
                <div className="nav-item no-hover">
                    <h6 className="title">
                        {currentUser.user !== "" ? currentUser.user : "guest"}
                    </h6>
                </div>
                <div className="nav-item nav-btn" id="header-btn">
                    <span></span> <span></span> <span></span>
                </div>
            </div>
            <div className="header-nav" id="header-menu">
                <div className="nav-left">
                    <div className="nav-item text-center">
                        <a href="https://github.com/macizomedia/team_papaya">
                            <span className="icon">
                                <i
                                    className="fas fa-wrapper fa-code-branch"
                                    aria-hidden="true"
                                ></i>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="nav-right">
                    <div
                        className="nav-item has-sub toggle-hover"
                        id="dropdown"
                    >
                        {!currentUser.token ? (
                            <a href="/login">
                                <i class="fas fa-sign-in-alt"></i>
                            </a>
                        ) : (
                            <a href="#dropdown" className="nav-dropdown-link">
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
