import React from "react";

export default function index() {
    return (
        <div className="card my-4">
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
    );
}
