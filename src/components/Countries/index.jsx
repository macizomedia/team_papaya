import React, { useEffect, useState } from "react";

export default function index() {
    const [input, setInput] = useState("");
    const [countryListDefault, setCountryListDefault] = useState();
    const [countryList, setCountryList] = useState();

    const fetchData = async () => {
        return await fetch("https://restcountries.eu/rest/v2/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryList(data);
                setCountryListDefault(data);
                console.log(data);
            });
    };

    const updateInput = async (input) => {
        const filtered = countryListDefault.filter((country) => {
            return country.name.toLowerCase().includes(input.toLowerCase());
        });
        setInput(input);
        setCountryList(filtered);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="input-control">
            <input
                className="input-large mb-3"
                key="random1"
                value={input}
                placeholder={"search country"}
                onChange={(e) => updateInput(e.target.value)}
            />

            <div className="grid grid-cols-4 grid-gap-2">
                {input ? (countryList.map(item => (
                    /* MAP COUNTRY COMPONENT */
                    <div className="card" key={item.name}>
                        <div className="card__container">
                            <div className="card__image" style={{
                                backgroundImage: `url("https://picsum.photos/id/${(Math.floor(Math.random()* 1000) + 13)}/600/400")`
                            }}></div>
                            <div className="card__title-container">
                                <p className="title">{item.name}</p><span className="subtitle">{item.capital}</span></div>
                        </div>
                        <div className="content">
                            <div className="divider"></div>
                            <p>{item.region}</p>
                            <p>{item.population}</p>
                            <a href={`country/${item.alpha2Code.toLowerCase()}`}>{item.name}</a>
                        </div>
                    </div>
                ))) : (null)}
            </div>
        </div>
    );
}
