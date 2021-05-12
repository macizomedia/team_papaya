import React, { useEffect, useState } from 'react'

export default function index() {
    const [input, setInput] = useState('');
    const [countryListDefault, setCountryListDefault] = useState();
    const [countryList, setCountryList] = useState();

    const fetchData = async () => {
        return await fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(data => {
                setCountryList(data)
                setCountryListDefault(data)
            });
    }

    const updateInput = async (input) => {
        const filtered = countryListDefault.filter(country => {
            return country.name.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setCountryList(filtered);
    }

    useEffect(() => { fetchData() }, []);
    return (
        <div>
            <input
                key="random1"
                value={input}
                placeholder={"search country"}
                onChange={(e) => updateInput(e.target.value)}
            />

            {input ? (countryList.map(item => (
                <div key={item.name}>
                    <p>{item.name}</p>
                    <p>{item.capital}</p>
                    <p>{item.population}</p>
                </div>
            ))) : (null)}
        </div>
    )
}
