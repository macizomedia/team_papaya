import React from "react";
import Countries from "../components/Countries";

import PapayaExplorer from "../assets/img/papaya_Logo.png";

import { useCountryState } from "../store/index";
const Home = (props) => {
    const { dreamList } = useCountryState();
    console.log(dreamList);
    return (
        <>
            <div className="col-3" style={{}}>
                <img
                    src={PapayaExplorer}
                    alt=""
                    style={{ width: "30%", display: "inline" }}
                />
                <h1 className="display-2">Give me a country name</h1>
            </div>
            {/* <h1 className="display-2">Papaya Explorer</h1> */}
            <Countries />
        </>
    );
};

export default Home;
