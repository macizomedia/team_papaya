import React from "react";
import Countries from "../components/Countries";
import Wallpaper from "../img/wallpaper.png";

const Home = (props) => {
    return (
        <div className={Home}>
            <h1 className="display-2">Papaya Explorer</h1>
            <Countries />
        </div>
    );
};

export default Home;
