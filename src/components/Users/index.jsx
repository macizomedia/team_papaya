import React, { useState, useEffect } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";

createAvatar(style, {
    seed: "custom-seed",
});

export default function index({ avatar, user, list }) {
    return (
        <div
            className="p-3 mt-5 my-4 card"
            style={{ backgroundColor: "rgba(241, 221, 183, 0.8)" }}
        >
            <h3 className="display uppercase my-5" style={{ color: "#d13a1c" }}>
                Welcome {user}
            </h3>

            <div className="frame__header u-text-center">
                <div>
                    <figure className="avatar avatar--xlarge">
                        <img alt="avatar" src={`${avatar}/:seed.svg`} />
                    </figure>
                </div>
                <div>
                    <div className="frame__title font-bold">{user}</div>
                    <div className="frame__subtitle"></div>
                </div>
                <div className="row">
                    <a
                        className="col"
                        style={{ fontSize: 40, color: "#E65F44" }}
                        href="https://www.facebook.com/"
                    >
                        <i
                            className="fab fa-wrapper fa-facebook link-btn"
                            aria-hidden="true"
                        ></i>
                    </a>
                    <a
                        className="col"
                        style={{ fontSize: 40, color: "#E65F44" }}
                        href="https://www.twitter.com/"
                    >
                        <i
                            className="fab fa-wrapper fa-twitter link-btn"
                            aria-hidden="true"
                        ></i>
                    </a>
                    <a
                        className="col"
                        style={{ fontSize: 40, color: "#E65F44" }}
                        href="https://www.instagram.com/"
                    >
                        <i
                            className="fab fa-wrapper fa-instagram link-btn"
                            aria-hidden="true"
                        ></i>
                    </a>
                    <a
                        className="col"
                        style={{ fontSize: 40, color: "#E65F44" }}
                        href="https://www.medium.com/"
                    >
                        <i
                            className="fab fa-wrapper fa-medium link-btn"
                            aria-hidden="true"
                        ></i>
                    </a>
                </div>
                {list
                    ? list.map((item) => (
                          <div class="card bg-orange-100 my-4">
                              <div class="card__header">
                                  <p
                                      style={{ color: "#d13a1c" }}
                                      class="font-bold px-3"
                                  >
                                      {item.name}
                                  </p>
                              </div>
                              <div style={{ minHeight: "200px" }}>
                                  <div className="card__container">
                                      <div
                                          className="card__image"
                                          style={{
                                              backgroundImage: `url(${item.image})`,
                                          }}
                                      ></div>
                                  </div>
                              </div>

                              <div class="card__action-bar u-center">
                                  <button
                                      class="btn outline"
                                      style={{
                                          color: "#E65F44",
                                          border: "solid #d13a1c 1px",
                                      }}
                                  >
                                      Book a hotel
                                  </button>

                                  <button
                                      class="btn outline"
                                      style={{
                                          color: "#E65F44",
                                          border: "solid #d13a1c 1px",
                                      }}
                                  >
                                      Book a flight
                                  </button>
                              </div>
                          </div>
                      ))
                    : null}
            </div>

            <div className="content-no-padding">
                <div className="divider m-0"></div>
            </div>
        </div>
    );
}
