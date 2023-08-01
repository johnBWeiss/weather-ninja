import React from "react";
import partCloud from "../../assets/images/partly cloudy.png";
import fullHeart from "../../assets/images/full-heart-icon-black.png";
import emptyHeart from "../../assets/images/empty-heart-icon.png";

const City = ({ cityName, temp, title, gallery }) => {
  return (
    <div className="city-container vertical-flex gap-8 ">
      {title}
      <div className="vertical-flex ">
        <div className="gap-12">
          <img className="weather-img" src={partCloud} alt="part cloud" />{" "}
          <div>23C</div>
        </div>
      </div>{" "}
      <div className="space-between">
        <div>Tel Aviv</div>
        {!gallery && <img className="heart-icon-city" src={fullHeart} alt="heart" />}
      </div>
    </div>
  );
};
export default City;
