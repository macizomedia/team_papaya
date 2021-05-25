import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import {
    like,
    useAuthState,
    useCountryDispatch,
    useCountryState,
} from "../../store/index.js";

const unsplash = createApi({
    accessKey: "7Ia8dL8h1dD2yr6pR_d49RHaFO-KxM-xyMnYaOP_-VM",
    fetch: nodeFetch,
});

export default function index() {
    const { currentUser } = useAuthState();
    const dispatch = useCountryDispatch();
    const { currentList } = useCountryState();
    let { id } = useParams();
    let countryName;

    console.log("from country" + JSON.stringify(currentList, null, 2));

    const [country, setCountry] = useState();
    const [photos, setPhotos] = useState();

    const fetchData = async () => {
        return await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCountry(data);
                countryName = data.name.toLowerCase();
                console.log(countryName);
                console.log(data);
            });
    };
    const fetchImages = async (name) => {
        return await unsplash.search
            .getPhotos({
                query: name,
                page: 1,
                perPage: 9,
            })
            .then((data) => {
                setPhotos(data.response.results);
            });
    };
    useEffect(() => {
        fetchData();
        setTimeout(() => {
            fetchImages(countryName);
        }, 900);
    }, [id]);

    const addDreamList = async (e) => {
        let list = currentUser.list;
        let payload = [
            ...list,
            { name: country.name, image: photos[2].urls.small },
        ];

        e.preventDefault();
        try {
            let response = await like(dispatch, payload);
            if (!response) return;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {country ? (
                <div>
                    <h1 className="headline-3 uppercase text-yellow-300">{country.name}</h1>
                    <img
                        src={photos ? photos[0].urls.full : null}
                        alt=""
                        className="u-round"
                    />

                    {/* ##### Card ###### */}
                    <div
                        className="card my-4 u-center"
                        style={{ maxWidth: "350px" }}
                    >
                        <div className="card__container">
                            <div
                                className="card__image"
                                style={{
                                    backgroundImage: `url(
                                    ${photos ? photos[1].urls.full : null}
                                )`,
                                }}
                            ></div>

                            <div className="card__title-container"></div>
                        </div>
                        <div className="content">
                            <p>
                                <b>Continent: </b>
                                {country.subregion}
                            </p>
                            <p>
                                {" "}
                                <b>Capital: </b>
                                {country.capital}
                            </p>
                            <p>
                                {" "}
                                <b>Population: </b>
                                {country.population}
                            </p>
                            <p>
                                {" "}
                                <b>Area: </b>
                                {country.area}km²
                            </p>

                            <p>
                                {" "}
                                <b>Language: </b>
                                {country.languages[0].name}
                            </p>
                            <button
                                onClick={addDreamList}
                                className="btn-link outline animated bounceIn"
                                style={{
                                    color: "#d13a1c",
                                    border: "solid #d13a1c 1px",
                                }}
                            >
                                <span class="icon">
                                    <i
                                        className="fa fa-wrapper fa-heart animated pulse"
                                        style={{ color: "#d13a1c" }}
                                        aria-hidden="true"
                                    ></i>
                                </span>
                                Add to my dream trip list
                            </button>
                        </div>
                    </div>

                    {/* ##### Photos ###### */}
                    <div className="row">
                        <div className="col-lg-6 ">
                            <img
                                src={photos ? photos[1].urls.full : null}
                                alt=""
                                className="u-round animated fadeIn"
                            />
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={photos ? photos[2].urls.full : null}
                                alt=""
                                className="u-round"
                            />
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={photos ? photos[3].urls.full : null}
                                alt=""
                                className="u-round"
                            />
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={photos ? photos[4].urls.full : null}
                                alt=""
                                className="u-round"
                            />
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={photos ? photos[5].urls.full : null}
                                alt=""
                                className="u-round"
                            />
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={photos ? photos[6].urls.full : null}
                                alt=""
                                className="u-round"
                            />
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={photos ? photos[7].urls.full : null}
                                alt=""
                                className="u-round"
                            />
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={photos ? photos[8].urls.full : null}
                                alt=""
                                className="u-round"
                            />
                        </div>
                    </div>
                </div>
            ) : null}
            <div class="placeholder">
                <div class="placeholder-icon">
                    <span class="icon">
                        <i
                            class="fa fa-wrapper fa-atlas x-larger"
                            style={{ color: "#d13a1c" }}
                        ></i>
                    </span>
                </div>
                <h6 class="placeholder-title" style={{ color: "#d13a1c" }}>
                    Keep Adding Places
                </h6>
                <div class="placeholder-subtitle" style={{ color: "#d13a1c" }}>
                    Come back in a few hours or press the refresh button.
                </div>
                <div class="placeholder-commands u-center">
                    <div class="m-1">
                        <button
                            class="btn"
                            style={{
                                color: "#E65F44",
                                border: "solid #d13a1c 1px",
                            }}
                        >
                            Random
                        </button>
                    </div>
                    <div class="m-1">
                        <button
                            style={{
                                color: "#E65F44",
                                border: "solid #d13a1c 1px",
                            }}
                        >
                            <a href="/">Back to Explorer </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
