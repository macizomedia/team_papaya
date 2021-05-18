import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";

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
            });
    };
    const fetchImages = async (name) => {
        return await unsplash.search
            .getPhotos({
                query: name,
                page: 1,
                perPage: 4,
            })
            .then((data) => {
                console.log(data.response.results);
                setPhotos(data.response.results);
            });
    };
    useEffect(() => {
        fetchData();
        setTimeout(() => {
            fetchImages(countryName);
        }, 1000);
    }, [id]);

    // dreamList
    const [dreamList, setDreamList] = useState([]);

    const addDreamTripList = () => {
        if (dreamList.includes(country)) {
            alert("This country is already in your Dream List");
        } else {
            setDreamList(...dreamList, country);
        }
    };
    //console.log(dreamList);

    return (
        <div>
            {country ? (
                <div>
                    <div className="card">
                        <div className="card__container">
                            <div
                                className="card__image"
                                style={
                                    {
                                        //backgroundImage: `url(${country.flag})`,
                                        //backgroundImage: `url(${photo})`,
                                        /* backgroundImage: url(
                                        `https://unsplash.com/s/photos/${country.name}`
                                    ), */
                                    }
                                }
                            ></div>
                        </div>
                        <div className="card__mobile-title">
                            <div className="content">
                                <div className="tile">
                                    <div className="tile__container">
                                        <h4 className="tile__title">
                                            {country.name}
                                        </h4>
                                        <p className="tile__subtitle">
                                            {country.subregion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="content">
                            <p>Did you like the photo?</p>
                            <ul className="menu">
                                <li className="menu-item">
                                    <a href="!#">
                                        <span className="icon">
                                            <i
                                                className="fa fa-wrapper fa-check small"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        Yes
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="!#">
                                        <span className="icon">
                                            <i
                                                className="fa fa-wrapper fa-times small"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        No
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                        <div className="card__body content">
                            <p>Capital: {country.capital}</p>
                            <p>Population: {country.population}</p>
                            <p>
                                Area: {country.area}
                                km²
                            </p>
                            <p>Language: {country.languages[0].name}</p>
                        </div>
                        <div className="card__action-bar u-center">
                            <button
                                onClick={addDreamTripList}
                                className="btn-link outline"
                            >
                                Add to my dream trip list
                            </button>
                        </div>

                        <div className="card__footer content">
                            2 min. read 22 comments
                        </div>
                    </div>

                    {/* <code>{JSON.stringify(country, null, 2)}</code> */}
                </div>
            ) : null}
        </div>
    );
}
