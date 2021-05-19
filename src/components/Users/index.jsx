

import React from 'react'
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";

createAvatar(style, {
  seed: 'custom-seed',
});


export default function index({avatar, user}) {

    return (
        <div className="dashboard">
          
            <h3 className="display uppercasegit">Welcome {user}</h3>
            <div className="frame">
                <div className="frame__header u-text-center">
                    <div>
                        <figure className="avatar avatar--xlarge">
                            <img alt="avatar" src={`${avatar}/:seed.svg`} />
                        </figure>

                    </div>
                    <div>
                        <div className="frame__title font-bold">{user}</div>
                        <div className="frame__subtitle">

                        </div>
                    </div>
                    <div className="row">
                        <a className="col" style={{fontSize: 40}} href="https://www.facebook.com/">
                            <i
                                className="fab fa-wrapper fa-facebook link-btn"
                                aria-hidden="true"
                            ></i>
                        </a>
                        <a className="col" style={{fontSize: 40}} href="https://www.twitter.com/">
                            <i
                                className="fab fa-wrapper fa-twitter link-btn"
                                aria-hidden="true"
                            ></i>
                        </a>
                        <a className="col" style={{fontSize: 40}} href="https://www.instagram.com/">
                            <i
                                className="fab fa-wrapper fa-instagram link-btn"
                                aria-hidden="true"
                            ></i>
                        </a>
                        <a className="col" style={{fontSize: 40}} href="https://www.medium.com/">
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
            </div>
        </div>
    );
}


