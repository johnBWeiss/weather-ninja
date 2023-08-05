import React, { useState, useEffect } from "react";
import fullHeart from "../../assets/images/full-heart-icon-black.png";
import emptyHeart from "../../assets/images/empty-heart-icon.png";
import { fahrenheitToCelsius } from "../../utils/helperFunction";
import { celsiusToFahrenheit } from "../../utils/helperFunction";
import { isFavoriteHandler } from "../../utils/helperFunction";
import { getImageForWeather } from "../../utils/helperFunction";
import useToggleFavorite from "../../customHooks/useToggleFavorite";

const City = ({
  cityName,
  cityCode,
  title,
  cityTemperature,
  data,
  isFarenheight,
  favoriteClickHandler,
  isDarkMode,
  weatherText,
}) => {
  const { toggleFavoriteHandler } = useToggleFavorite(
    cityName,
    cityTemperature,
    cityCode,
    weatherText
  );

  const [stateSingleTemperature, setStateSingleTemperature] = useState(
    cityTemperature ?? ""
  );

  const imperialVsMetricToggleHandler = () => {
    let temp;
    if (isFarenheight) {
      temp = celsiusToFahrenheit(stateSingleTemperature);
    }
    if (!isFarenheight) {
      temp = fahrenheitToCelsius(cityTemperature);
    }
    setStateSingleTemperature(temp);
  };

  const displayFavorite = () => {
    if (favoriteClickHandler) {
      favoriteClickHandler(cityTemperature, cityName, cityCode, weatherText);
    }
  };

  useEffect(() => {
    setStateSingleTemperature(cityTemperature);
    if (!isFarenheight) {
      imperialVsMetricToggleHandler();
    }
  }, [data, cityTemperature, isFarenheight, cityCode]);

  return (
    <div
      className={`city-container vertical-flex ${
        favoriteClickHandler && "hoverEffect"
      } `}
      onClick={displayFavorite}
      style={{
        background: isDarkMode ? "grey" : "white",
      }}
    >
      <div className=" gap-6 vertical-flex">
        <div className="city-title bold">{cityName}</div>
        <div className="font-10">{cityCode}</div>
      </div>
      {title}
      <div className="gap-20 vertical-flex width-100 bold">
        <div className="gap-12">
          <img
            className="weather-img"
            src={getImageForWeather(weatherText)}
            alt="part cloud"
          />
          <div>{weatherText}</div>
        </div>
      </div>
      <div className="space-between bottom-row-city">
        <div>
          {stateSingleTemperature}
          {isFarenheight ? " °F" : " °C"}
        </div>
        <img
          onClick={(e) =>
            toggleFavoriteHandler(
              e,
              cityName,
              cityTemperature,
              cityCode,
              weatherText
            )
          }
          className="heart-icon-city hoverEffect"
          src={isFavoriteHandler(cityCode) ? fullHeart : emptyHeart}
          alt="heart"
        />
      </div>
    </div>
  );
};
export default City;
