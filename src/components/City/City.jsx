import React, { useState, useEffect, useRef } from "react";
import partCloud from "../../assets/images/partly cloudy.png";
import fullHeart from "../../assets/images/full-heart-icon-black.png";
import emptyHeart from "../../assets/images/empty-heart-icon.png";
import { fahrenheitToCelsius } from "../../utils/helperFunction";
import { celsiusToFahrenheit } from "../../utils/helperFunction";
import { getDayAndMonth } from "../../utils/helperFunction";
import { isFavoriteHandler } from "../../utils/helperFunction";

import useToggleFavorite from "../../customHooks/useToggleFavorite";
const City = ({
  cityName,
  cityCode,
  title,
  cityTemperature,
  data,
  type,
  isFarenheight,
  favoriteClickHandler,
}) => {
  const { toggleFavoriteHandler } = useToggleFavorite(
    cityName,
    cityTemperature,
    cityCode
  );

  const [stateMinMaxTemperature, setStateMinMaxTemperature] = useState(
    data?.Temperature ?? ""
  );
  const [stateSingleTemperature, setStateSingleTemperature] = useState(
    cityTemperature ?? ""
  );

  const temperatureType = useRef("F");

  const imperialVsMetricToggleHandler = () => {
    if (type === "weeklyItem") {
      let min, max;
      if (temperatureType.current === "C") {
        min = celsiusToFahrenheit(stateMinMaxTemperature?.Minimum?.Value);
        max = celsiusToFahrenheit(stateMinMaxTemperature?.Maximum?.Value);
      }
      if (temperatureType.current === "F") {
        min = fahrenheitToCelsius(data?.Temperature?.Minimum?.Value);
        max = fahrenheitToCelsius(data?.Temperature?.Maximum?.Value);
      }
      setStateMinMaxTemperature({
        Minimum: { Value: min },
        Maximum: { Value: max },
      });
    }

    if (type !== "weeklyItem") {
      let temp;

      if (temperatureType.current === "C") {
        temp = celsiusToFahrenheit(stateSingleTemperature);
      }
      if (temperatureType.current === "F") {
        temp = fahrenheitToCelsius(cityTemperature);
      }
      console.log(temp);
      setStateSingleTemperature(temp);
    }

    temperatureType.current === "C"
      ? (temperatureType.current = "F")
      : (temperatureType.current = "C");
  };

  const dayAndMonth = getDayAndMonth(data?.Date);

  const displayFavorite = () => {
    if (favoriteClickHandler) {
      favoriteClickHandler(cityCode, cityName);
    }
  };

  useEffect(() => {
    setStateMinMaxTemperature(data?.Temperature);
    setStateSingleTemperature(cityTemperature);
    if (!isFarenheight) {
      temperatureType.current = "F";
      imperialVsMetricToggleHandler();
    }
  }, [data, cityTemperature, isFarenheight, cityCode]);

  return (
    <div
      className="city-container vertical-flex gap-8 "
      onClick={displayFavorite}
    >
      <div className="celsius-button" onClick={imperialVsMetricToggleHandler}>
        {temperatureType.current === "F" ? "C" : "F"}
      </div>
      <div></div>
      {title}
      <div className="vertical-flex ">
        <div className="gap-12">
          <img className="weather-img" src={partCloud} alt="part cloud" />{" "}
          {type === "weeklyItem" ? (
            <div>
              {stateMinMaxTemperature?.Minimum?.Value} -
              {stateMinMaxTemperature?.Maximum?.Value}
            </div>
          ) : (
            <div>{stateSingleTemperature}</div>
          )}
        </div>
      </div>
      <div className="space-between">
        {type === "weeklyItem" ? (
          <div>{dayAndMonth}</div>
        ) : (
          <div>{cityName}</div>
        )}
        <div> ° {temperatureType.current}</div>

        {type !== "weeklyItem" && (
          <img
            onClick={(e) =>
              toggleFavoriteHandler(e, cityName, cityTemperature, cityCode)
            }
            className="heart-icon-city"
            src={isFavoriteHandler(cityCode) ? fullHeart : emptyHeart}
            alt="heart"
          />
        )}
      </div>
    </div>
  );
};
export default City;
