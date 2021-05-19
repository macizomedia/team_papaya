import React, { useState, useEffect } from 'react'
import { fetchData, fetchImages } from "../../api";
import { createAvatar } from "@dicebear/avatars";
import { switchMap, map } from "rxjs/operators";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import * as style from "@dicebear/micah";

createAvatar(style, {
    seed: 'custom-seed',
});
const unsplash = createApi({
    accessKey: "7Ia8dL8h1dD2yr6pR_d49RHaFO-KxM-xyMnYaOP_-VM",
    fetch: nodeFetch,
});
let URL = "https://restcountries.eu/rest/v2/all";

const data$ = fetchData(URL);

const photos$ = data$.pipe(
    map((data) =>
        data.map((data) => data.name.toLowerCase())
    ) /* getting data name to goes to switchMap */,
    switchMap((val) => fetchImages(val)) /* val is country name in lowerCase */,
    map((result) =>
        result.map((photo) => photo.urls)
    ) /* Result is nested look on fetchImages function to see what is result */
);
const useObservable = (observable, setFunc) => {
    useEffect(() => {
        let subscription = observable.subscribe((result) => {
            setFunc(result);
        });
        return () => subscription.unsubscribe();
    }, [observable, setFunc]);
};


export default function index({ avatar, user, list }) {
    const [photos, setPhotos] = useState([]);
    const fetchImg = async (name) => {
        return await unsplash.search
            .getPhotos({
                query: name,
                page: 1,
                perPage: 9,
            })
            .then((data) => {
                setPhotos(photos.concat(data.response.results));
            });
    };

    useEffect(() => {
        list.map(item => fetchImg(item))
        return () => { }
    }, [])

    console.log("from users" + JSON.stringify(photos, null, 4))

    return (
        <>
            <div className="dashboard">

                <h3 className="display uppercase">Welcome {user}</h3>
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
                            <a className="col" style={{ fontSize: 40 }} href="https://www.facebook.com/">
                                <i
                                    className="fab fa-wrapper fa-facebook link-btn"
                                    aria-hidden="true"
                                ></i>
                            </a>
                            <a className="col" style={{ fontSize: 40 }} href="https://www.twitter.com/">
                                <i
                                    className="fab fa-wrapper fa-twitter link-btn"
                                    aria-hidden="true"
                                ></i>
                            </a>
                            <a className="col" style={{ fontSize: 40 }} href="https://www.instagram.com/">
                                <i
                                    className="fab fa-wrapper fa-instagram link-btn"
                                    aria-hidden="true"
                                ></i>
                            </a>
                            <a className="col" style={{ fontSize: 40 }} href="https://www.medium.com/">
                                <i
                                    className="fab fa-wrapper fa-medium link-btn"
                                    aria-hidden="true"
                                ></i>
                            </a>
                        </div>
                        {list ? (list.map(item => (<div class="card">
                            <div class="card__header">
                                <p class="font-bold px-3">{item}</p>
                            </div>
                            <div style={{ minHeight: "300px" }}>
                                <div className="card__container">

                                    {photos ? photos.map(photo => (
                                        <div className="card__image"
                                            style={{ backgroundImage: `url(${photo.urls.full})` }}
                                        >


                                        </div>)) : (null)}
                                </div>
                            </div>

                            <div class="card__footer level content">6:32 PM - 3 Jul 18</div>
                            <div class="card__action-bar u-center">
                                <button class="btn-transparent outline">Cancel</button>
                                <button class="btn-transparent outline">Save</button>
                                <button class="btn-transparent outline">Post</button>
                            </div>
                        </div>))) : (null)}
                    </div>

                    <div className="content-no-padding">
                        <div className="divider m-0"></div>
                    </div>
                </div>
            </div>

        </>
    );
}


