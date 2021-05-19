import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import {
    like,
    useCountryState,
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
                perPage: 6,
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
        }, 900);
    }, [id]);

    const dispatch = useCountryDispatch();


    const addDreamList = async (e) => {
        e.preventDefault();
        console.log("click");
        let payload = country.name;
        console.log("payload at" + payload)
        try {
            let response = await like(dispatch, payload);
            if (!response) return;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div >
            {country ? (
                <div className="card" style={{ maxWidth: "750px" }}>
                    <div className="card__container">
                        <div
                            class="card__image"
                            style={{
                                backgroundImage: `url(
                                    ${photos ? photos[0].urls.full : null}
                                )`,
                            }}
                        ></div>

                        <div className="card__title-container">
                            {/* {country.map((item) => (
                                <p className="title"> {item}</p>
                            ))} */}
                            <p className="title">{country.name}</p>
                            <span className="subtitle">
                                {country.subregion}
                            </span>
                        </div>
                    </div>
                    <div className="content">
                        <p>Capital: {country.capital}</p>
                        <p>Population: {country.population}</p>
                        <p>Area: {country.area}km²</p>
                        <p>Language: {country.languages[0].name}</p>
                    </div>
                    <div className="card__action-bar u-center">
                        <button
                            onClick={addDreamList}
                            className="btn-link outline"
                        >
                            Add to my dream trip list!
                        </button>
                    </div>
                    <div className="card__footer">
                        <div className="u-text-center">
                            <span>This is additional footer text in</span>
                        </div>
                    </div>

                    <code>{JSON.stringify(country, null, 4)}</code>
                    {photos
                        ? photos.map((photo) => (
                            <div>
                                <img src={photo.urls.full} alt="" />
                            </div>
                        ))
                        : null}
                </div>
            ) : null}
        </div>
    );
}
