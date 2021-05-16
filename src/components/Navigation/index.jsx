import React from "react";
import { useAuthState } from "../../store/index";

export default function index() {
  const { currentUser } = useAuthState();
  return (
    <div className="header header-fixed unselectable header-animated">
      <div className="header-brand">
        <div className="nav-item no-hover">
          <h6 className="title">{currentUser.user !== "" ? currentUser.user : "guest"}</h6>
        </div>
        <div className="nav-item nav-btn" id="header-btn">
          <span></span> <span></span> <span></span>{" "}
        </div>
      </div>
      <div className="header-nav" id="header-menu">
        <div className="nav-left">
          <div className="nav-item text-center">
            {" "}
            <a href="#">
              {" "}
              <span className="icon">
                {" "}
                <i
                  className="fab fa-wrapper fa-twitter"
                  aria-hidden="true"
                ></i>{" "}
              </span>{" "}
            </a>{" "}
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-item has-sub toggle-hover" id="dropdown">
            <a className="nav-dropdown-link">Menu</a>
            <ul className="dropdown-menu dropdown-animated" role="menu">
              <li role="menu-item">
                <a href="/login">LogIn</a>
              </li>
              <li role="menu-item">
                <a href="/signup">SignUp</a>
              </li>
              <li role="menu-item">
                <a href="/dashboard">My Dashboard</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
