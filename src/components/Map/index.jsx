import React from "react";
import { VectorMap } from "react-jvectormap";


const mapData = {
  CN: 100000,
  IN: 9900,
  SA: 86,
  EG: 70,
  SE: 0,
  FI: 0,
  FR: 0,
  US: 20
};


const Map = () => {
    let color = "#32991";
    const handleClick = (e) => {
        console.log(e.currentTarget);
        color = "#fff";
    };

    return (
        <div
            className="map card"
            style={{ backgroundColor: "rgba(241, 221, 183, 0.8)" }}
        >
            <h2 className="subtitle" style={{ color: "#E65F44" }}>
                Countries you have visited
            </h2>
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
                            values: mapData,
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
