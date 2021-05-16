import React, { useEffect, useState } from 'react'
import {
    useParams,
    useRouteMatch
} from "react-router-dom";


export default function index() {
    let { id } = useParams()
    console.log(id)
    const [country, setCountry] = useState()
    const fetchData = async () => {

        return await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCountry(data)
            });
    }

    useEffect(() => {
        fetchData()

    }, [id])

    return (
        <div>
            <h1>COUNTRY</h1>
            <code>{JSON.stringify(country, null, 2)}</code>
        </div>
    )
}
