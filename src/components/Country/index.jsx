import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import {
    like,
    //useCountryState,
    useCountryDispatch,
} from "../../store/index.js";

const unsplash = createApi({
    accessKey: "7Ia8dL8h1dD2yr6pR_d49RHaFO-KxM-xyMnYaOP_-VM",
    fetch: nodeFetch,
});

export default function index() {
    let { id } = useParams();
    let countryName;

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
                console.log(data.response.results);
                setPhotos(data.response.results);
                console.log(data.length);
            });
    };
    useEffect(() => {
        fetchData();
        setTimeout(() => {
            fetchImages(countryName);
        }, 900);
    }, [id]);

    const dispatch = useCountryDispatch();

    const addDreamList = async (e) => {
        e.preventDefault();
        console.log("click");
        let payload = country.name;
        console.log("payload at" + payload);
        try {
            let response = await like(dispatch, payload);
            if (!response) return;
        } catch (error) {
            console.log(error);
        }
    };

    console.log(Math.floor(Math.random() * 10));
    return (
        <div>
            {country ? (
                <div>
                    <h1>{country.name}</h1>
                    <img
                        src={photos ? photos[0].urls.full : null}
                        alt=""
                        className="u-round"
                    />

                    {/* Card */}
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

                            <div className="card__title-container">
                                {/* {country.map((item) => (
                                <p className="title"> {item}</p>
                            ))} */}
                                {/* <p className="title">{country.name}</p>
                                <span className="subtitle">
                                    {country.subregion}
                                </span> */}
                            </div>
                        </div>
                        <div className="content">
                            <p>
                                {" "}
                                <b>Capital:</b>
                                {country.capital}
                            </p>
                            <p>
                                {" "}
                                <b>Population:</b>
                                {country.population}
                            </p>
                            <p>Area: {country.area}km²</p>

                            <p>Language: {country.languages[0].name}</p>
                        </div>
                        <div className="card__action-bar u-center">
                            <button
                                onClick={addDreamList}
                                className="btn-link outline animated bounceIn"
                            >
                                <span class="icon">
                                    <i
                                        className="fa fa-wrapper fa-heart animated pulse"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                                Add to my dream trip list
                            </button>
                        </div>
                        <div className="card__footer">
                            <div className="u-text-center">
                                <span>This is additional footer text in</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <img
                                src={photos ? photos[1].urls.full : null}
                                alt=""
                                className="u-round"
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
        </div>
    );
}

/*
<div key={photo.description}>
                                      <img src={photo.urls.full} alt="" />
                                  </div>

<figure class="fig">
                            <img src="img/yosemite-falls.png" />
                            <figcaption className="fig-caption u-text-center">
                                Yosemite Valley, United States
                            </figcaption>
                        </figure>
                        
*/

/* 
                        <code>{JSON.stringify(country, null, 4)}</code>

*/
