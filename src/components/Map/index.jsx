import React, { useState } from "react";
import { VectorMap } from "react-jvectormap";

const randomColor = require("randomcolor"); // import the script

randomColor({
    count: 10,
    // hue: 'green',
    luminosity: "light",
});

const mapData = {};

// let newColor;
let color;

const handleClick = (e, countryCode) => {
    color = randomColor();
    console.log(color);
    // newColor = await Color();
    // console.log(countryCode);
    // console.log(newColor);
};

const Map = () => {
    const [state, setState] = useState();

    return (
        <div className="map ">
            <h2 className="subtitle">Countries you have visited</h2>
            <p>
                {" "}
                <i className="subtitle">(click on the map to select)</i>{" "}
            </p>
            <VectorMap
                map={"world_mill"}
                backgroundColor="#95c8f5" //change it to ocean blue: #0077be
                zoomOnScroll={true}
                containerStyle={{
                    width: "100%",
                    height: "520px",
                }}
                onRegionClick={handleClick} //gets the country code
                containerClassName="map"
                regionStyle={{
                    initial: {
                        fill: "#5e6061",
                        "fill-opacity": 3,
                        stroke: " none",
                        "stroke-width": 0,
                        "stroke-opacity": 0,
                    },
                    hover: {
                        fill: "#6E8C03",
                        "fill-opacity": 2,
                        cursor: "pointer",
                    },
                    selected: {
                        fill: { color },
                    },
                    selectedHover: {
                        fill: " #A9BF7A",
                        "fill-opacity": 2,
                    },
                }}
                regionsSelectable={true}
                series={{
                    regions: [
                        {
                            values: mapData, //this is your data
                            scale: ["#BFCDD9", "#BF8756", "#8C4F2B"], //your color game's here
                            normalizeFunction: "polynomial",
                            fill: " #D9946C",
                        },
                    ],
                }}
            />
        </div>
    );
};
export default Map;
