import React, { useEffect, useState } from "react";

export default function index() {
    const [input, setInput] = useState("");
    const [fetchStatus, setFetchStatus] = useState(true)
    const [countryListDefault, setCountryListDefault] = useState();
    const [countryList, setCountryList] = useState();

    const fetchData = async () => {
        return await fetch("https://restcountries.eu/rest/v2/all")
            .then((response) => response.json())
            .then((data) => {
                if(fetchStatus){
                setCountryList(data);
                setCountryListDefault(data);
                console.log(data);
                }
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
        return () => {
            setFetchStatus(false)
        }
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

            <div className="grid grid-cols-2 grid-gap-2">
                {input
                    ? countryList.map((item) => (
                          /* MAP COUNTRY COMPONENT */
                          <div className="card" key={item.name}>
                              <div className="card__container">
                                  <a
                                      href={`country/${item.alpha2Code.toLowerCase()}`}
                                  >
                                      <div
                                          className="card__image"
                                          style={{
                                              backgroundImage: `url("https://picsum.photos/id/${Math.floor(
                                                  Math.random() * 1000
                                              ) + 13}/600/400")`,
                                          }}
                                          /* style={photos ? photos.map(photo => photo[1].urls.full) : null} */
                                      ></div>
                                      <div className="card__title-container">
                                          <p className="title">{item.name}</p>
                                          <span className="subtitle">
                                              {item.capital}
                                          </span>
                                      </div>
                                  </a>
                              </div>
                              <div className="content">
                                  <div className="divider"></div>
                                  <a
                                      href={`country/${item.alpha2Code.toLowerCase()}`}
                                  >
                                      {item.name}
                                  </a>
                                  <p>{item.region}</p>
                                  {/* <p>{item.population}</p> */}
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
