import React from "react";
import Countries from "../components/Countries";
import Wallpaper from "../img/wallpaper.png";

import { useCountryState } from "../store/index";
const Home = (props) => {
    const { dreamList } = useCountryState();
    console.log(dreamList);
    return (
        <>
            <h1 className="display-2">HOME</h1>
            <Countries />
        </>
    );
};

export default Home;
