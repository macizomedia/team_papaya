import { getCode } from "country-list";
import React from "react";
import { VectorMap } from "react-jvectormap";

const Map = () => {
    let color = "#32991";
    const handleClick = (e) => {
        console.log(e.currentTarget);
        color = "#fff";
    };

    return (
        <div className="map card">
            <h2 className="subtitle">Countries you have visited</h2>
            <p>
                <i className="subtitle">(click on the map to select)</i>
            </p>
            <VectorMap
                map={"world_mill"}

                backgroundColor="#95c8f5"
                zoomOnScroll={true}
                containerStyle={{
                    width: "100%",
                    height: "520px",
                }}
                onRegionClick={handleClick}
                onRegionTipShow={(e) => getCode()}
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
                        fill: `${color}`,
                        "fill-opacity": 1,
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
