

import React from 'react'
import  Admin from '../Admin'
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";

let svg = createAvatar(style ,{
    seed: 'custom-seed',
});


export default function index({avatar, user}) {

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <h3 className="display">Welcome {user}</h3>
            <div className="frame">
                <div className="frame__header u-text-center">
                    <div>
                        <figure className="avatar avatar--xlarge">
                            <img alt="avatar" src={avatar} />
                        </figure>

                    </div>
                    <div>
                        <div className="frame__title">{user}</div>
                        <div className="frame__subtitle">

                        </div>
                    </div>
                    <div className="row">
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
            </div>
        </div>
    );
}


