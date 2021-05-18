import { useAuthDispatch, logout, useAuthState } from "../../store/index";
import "./Dashboard.css";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";
<<<<<<< HEAD
import Map from "../UserMap";
import React, { useEffect, useState } from "react";
import Country from "../Country/index";
=======
import Map from '../UserMap';
import React, { useEffect, useState } from 'react';
>>>>>>> 55daea40fb5c5e80d8903e20490dd1e9951a5073
import { VectorMap } from "react-jvectormap";

function Dashboard({ history }) {
    const { currentUser } = useAuthState();

    const liStyle = { color: "red", fontSize: "23px" };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <h3 className="display">Welcome {currentUser.user}</h3>
            <div className="frame">
                <div className="frame__header u-text-center">
                    <div>
                        <figure className="avatar avatar--xlarge">
                            <img
                                alt="avatar"
                                src="https://avatars.dicebear.com/api/micah/:seed.svg"
                            />
                        </figure>
                    </div>
                    <div>
                        <div className="frame__title">{}</div>
                        <div className="frame__subtitle"></div>
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
                <div className="frame__body">
                    <h3> Countries I visited: </h3>
                    <p>
                        <i>(click on the countries you already visited)</i>
                    </p>
                    <Map />
                </div>
                <div className="content-no-padding">
                    <div className="divider m-0"></div>
                </div>
                <div className="frame__footer">
                    <div className="frame__subtitle u-text-center">
                        <i></i>
                    </div>
                </div>
            </div>

            <div className="card">
                <figure className="fig">
                    <figcaption className="fig-caption u-text-center">
                        <a
                            className="ALink"
                            href="https://naturebridge.org/programs/yosemite-school-environmental-science?gclid=CjwKCAjwqIiFBhAHEiwANg9szpbkA0VHAFdh_6SAX8doHIMnFs_Zz48KCmA74x7qSDvvR4k24lf9ARoCs60QAvD_BwE"
                        >
                            {" "}
                            Yosemite National Park
                            <p>
                                <i>(click to see more)</i>
                            </p>
                        </a>
                        <img
                            className="img-container"
                            src="https://images.canusa.de/img/regionen/usa/suedwesten/kalifornien/yosemite-national-park/yosemite-nationalpark-lake-view-landscape.cr2500x1093-0x39.jpg"
                        ></img>
                    </figcaption>

                    <figcaption className="fig-caption u-text-center">
                        <a
                            className="ALink"
                            href="https://www.germany.travel/en/home.html"
                        >
                            Travel in Germany{" "}
                            <p>
                                <i>(click to see more)</i>
                            </p>
                        </a>
                        <img src="https://cdn.cnn.com/cnnnext/dam/assets/170706112840-germany.jpg" />
                    </figcaption>

                    <figcaption className="fig-caption u-text-center">
                        <h4>Travel tips</h4>
                        <iframe
                            className="media-stretch rat-1-1"
                            width="660"
                            height="315"
                            src="https://www.youtube.com/embed/wEid0Hxt8mk"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        >
                            Some travel tips
                        </iframe>
                    </figcaption>

                    <figcaption className="fig-caption u-text-center">
                        <a
                            className="ALink"
                            href="https://www.bucketlistly.blog/inspiration"
                        >
                            Blog{" "}
                            <p>
                                <i>(click to see more)</i>
                            </p>
                        </a>
                        <iframe
                            className="media-stretch rat-1-1"
                            width="660"
                            height="315"
                            src="https://www.youtube.com/embed/4eIvzOmN0MU"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </figcaption>
                </figure>
            </div>
        </div>
<<<<<<< HEAD
    );
=======
        <div className="content-no-padding">
          <div className="divider m-0"></div>
        </div>
        <div className="frame__footer">
          <div className="frame__subtitle u-text-center">
            <i></i>
          </div>
        </div>
      </div>

      <div className="card">


        <figure className="fig">
          <figcaption className="fig-caption u-text-center">
            <a className="ALink"  href="https://naturebridge.org/programs/yosemite-school-environmental-science?gclid=CjwKCAjwqIiFBhAHEiwANg9szpbkA0VHAFdh_6SAX8doHIMnFs_Zz48KCmA74x7qSDvvR4k24lf9ARoCs60QAvD_BwE"> Yosemite National Park
          <p><i>(click to see more)</i></p>
            </a>
            <img className="img-container" src="https://images.canusa.de/img/regionen/usa/suedwesten/kalifornien/yosemite-national-park/yosemite-nationalpark-lake-view-landscape.cr2500x1093-0x39.jpg" ></img>


          </figcaption>

          <figcaption className="fig-caption u-text-center">
         
            <a className="ALink"  href="https://www.germany.travel/en/home.html">Travel in Germany  <p><i>(click to see more)</i></p></a>
            <img src="https://cdn.cnn.com/cnnnext/dam/assets/170706112840-germany.jpg" />

          </figcaption>

          <figcaption className="fig-caption u-text-center">
            <h4>Travel tips</h4>
            <iframe className="media-stretch rat-1-1" width="660" height="315" src="https://www.youtube.com/embed/wEid0Hxt8mk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>Some travel tips</iframe>
          </figcaption>

          <figcaption className="fig-caption u-text-center">

            <a className="ALink" href="https://www.bucketlistly.blog/inspiration">Blog  <p><i>(click to see more)</i></p></a>
            <iframe className="media-stretch rat-1-1" width="660" height="315" src="https://www.youtube.com/embed/4eIvzOmN0MU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </figcaption>
        </figure>
      </div>
    </div >
  );
>>>>>>> 55daea40fb5c5e80d8903e20490dd1e9951a5073
}

export default Dashboard;
