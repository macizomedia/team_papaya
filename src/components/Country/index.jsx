import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
    accessKey: '7Ia8dL8h1dD2yr6pR_d49RHaFO-KxM-xyMnYaOP_-VM',
    fetch: nodeFetch,
});

export default function index() {
    let { id } = useParams()
    let countryName;

    const [country, setCountry] = useState()
    const [photos, setPhotos] = useState()
    const fetchData = async () => {

        return await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
            .then(response => response.json())
            .then(data => {
                setCountry(data);
                countryName = data.name.toLowerCase();
                console.log(countryName)
            });
    }
    const fetchImages = async (name) => {
        return await unsplash.search.getPhotos({
            query: name,
            page: 1,
            perPage: 4,
        }).then(data => {
            console.log(data.response.results)
            setPhotos(data.response.results)

        });
    }
    useEffect(() => {
        fetchData()
        setTimeout(() => {
            fetchImages(countryName)
        }, 900);
    }, [id])

    return (
        <div>

            {
                country ? (
                    <div>
                        <h1>COUNTRY</h1>
                        <div className="grid grid-cols-2 grid-gap-2">
                            {photos ? (photos.map(photo => (
                                <div><img src={photo.urls.full}></img></div>
                            ))) : (null)}
                        </div>
                        <code>{JSON.stringify(country, null, 4)}</code>
                    </div>
                ) :
                    (null)
            }
        </div>
    )
}
