
import React from "react";
import { VectorMap } from "react-jvectormap";


const mapData = {
  
    // CN: 100000,
    // IN: 9900,
    // SA: 86,
    // EG: 70,
    // SE: 0,
    // FI: 0,
    // FR: 0,
    // US: 20,
  
};
const handleClick = (e, countryCode) => {
  console.log(countryCode);
};

const Map = () => {
  return (
    <div className="map">
      <h2>Countries you have visited</h2>
      <p> <i>(click on the map to select)</i> </p>
      <VectorMap        
        map={"world_mill"}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomOnScroll={true}
        containerStyle={{
          width: "100%",
          height: "520px"
        }}
        onRegionClick={handleClick} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#BFCDD9",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer"
          },
          selected: {
            fill: "#51608C" //color for the clicked country
          },
          selectedHover: {}
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: mapData, //this is your data
              scale: ["#BFCDD9", "#BF8756", "#8C4F2B"], //your color game's here
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
    </div>
  );
};
export default Map;

