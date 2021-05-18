import React from "react";
import { useAuthState } from "../../store/index";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-male-sprites";

let svg = createAvatar(style, {
  seed: 'custom-seed',
  radius: 30,
  backgroundColor: '#272727'
});

function Dashboard({ history }) {
  const { currentUser } = useAuthState();

  const liStyle = { color: "red", fontSize: "23px" };

  return (
    <div style={{ padding: 10 }}>
      <h3 className="display">Welcome {currentUser.user}</h3>
      <div className="frame">
        <div className="frame__header u-text-center">
          <div>
            <figure className="avatar">
              <img alt="avatar" src={`${currentUser.avatar}/:seed.svg`} />
            </figure>
          </div>
          <div>
            <div className="frame__title">{currentUser.user}</div>
            <div className="frame__subtitle">Freelance Photographer</div>
          </div>
          <div style={liStyle} className="row">
            <a className="col" href="https://www.facebook.com/">
              <i
                className="fab fa-wrapper fa-facebook link-btn"
                aria-hidden="true"
              ></i>
            </a>
            <a className="col" href="https://www.twitter.com/">
              <i
                className="fab fa-wrapper fa-twitter link-btn"
                aria-hidden="true"
              ></i>
            </a>
            <a className="col" href="https://www.instagram.com/">
              <i
                className="fab fa-wrapper fa-instagram link-btn"
                aria-hidden="true"
              ></i>
            </a>
            <a className="col" href="https://www.medium.com/">
              <i
                className="fab fa-wrapper fa-medium link-btn"
                aria-hidden="true"
              ></i>
            </a>
          </div>
        </div>
        <div className="content-no-padding">
          <div className="divider m-0"></div>
        </div>
        <div className="frame__body">
          <div className="content u-text-center">
            <h5>Lorem! Ipsum!</h5>
            <p>Fill.</p>
          </div>
        </div>
        <div className="content-no-padding">
          <div className="divider m-0"></div>
        </div>
        <div className="frame__footer">
          <div className="frame__subtitle u-text-center">
            <i>Ohh Lorem.</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
