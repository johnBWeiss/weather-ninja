import React, { useState, useEffect } from "react";
import partCloud from "../../assets/images/partly cloudy.png";
import fullHeart from "../../assets/images/full-heart-icon-black.png";
import emptyHeart from "../../assets/images/empty-heart-icon.png";
import { fahrenheitToCelsius } from "../../utils/helperFunction";
import { celsiusToFahrenheit } from "../../utils/helperFunction";
import { getDayAndMonth } from "../../utils/helperFunction";
import { isFavoriteHandler } from "../../utils/helperFunction";
import { useDispatch } from "react-redux";
import { setToggleDegreeType } from "../../../store/globalSlice";
import { weeklyMinMax } from "../../utils/helperFunction";
import useToggleFavorite from "../../customHooks/useToggleFavorite";
import sunIcon from "../../assets/images/sun-icon.png";
import moonIcon from "../../assets/images/moon-icon.png";
import { getImageForWeather } from "../../utils/helperFunction";

const City = ({
  cityName,
  cityCode,
  title,
  cityTemperature,
  data,
  type,
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

  const dispatch = useDispatch();

  const [stateMinMaxTemperature, setStateMinMaxTemperature] = useState(
    data?.Temperature ?? ""
  );
  const [stateSingleTemperature, setStateSingleTemperature] = useState(
    cityTemperature ?? ""
  );

  const imperialVsMetricToggleHandler = () => {
    if (type === "weeklyItem") {
      const minMax = weeklyMinMax(
        isFarenheight,
        stateMinMaxTemperature?.Minimum?.Value,
        stateMinMaxTemperature?.Maximum?.Value,
        data?.Temperature?.Minimum?.Value,
        data?.Temperature?.Maximum?.Value
      );

      setStateMinMaxTemperature({
        Minimum: { Value: minMax.min },
        Maximum: { Value: minMax.max },
      });
    }

    if (type !== "weeklyItem") {
      let temp;
      if (isFarenheight) {
        temp = celsiusToFahrenheit(stateSingleTemperature);
      }
      if (!isFarenheight) {
        temp = fahrenheitToCelsius(cityTemperature);
      }
      setStateSingleTemperature(temp);
    }
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
        gap: type === "weeklyItem" && "25px",
      }}
    >
      {type !== "weeklyItem" && (
        <div className=" gap-6 vertical-flex">
          <div className="city-title bold">{cityName}</div>
          <div className="font-10">{cityCode}</div>
        </div>
      )}
      {type === "weeklyItem" && (
        <div className="city-title bold">
          {stateMinMaxTemperature?.Minimum?.Value}
          {isFarenheight ? "°F" : "°C"}
          <span> - </span>
          {stateMinMaxTemperature?.Maximum?.Value}
          {isFarenheight ? "°F" : "°C"}
        </div>
      )}
      {title}
      <div className="gap-20 vertical-flex width-100 bold">
        {type === "weeklyItem" && (
          <>
            <div className="gap-12 self-start ">
              <img className="sun-img" src={sunIcon} alt="part cloud" />
              <div>{data?.Day?.IconPhrase}</div>
            </div>
            <div className="gap-17 self-start">
              <img className="moon-img" src={moonIcon} alt="part cloud" />
              <div>{data?.Night?.IconPhrase}</div>
            </div>
          </>
        )}
        {type !== "weeklyItem" && (
          <div className="gap-12">
            <img
              className="weather-img"
              src={getImageForWeather(weatherText)}
              alt="part cloud"
            />
            <div>{weatherText}</div>
          </div>
        )}
      </div>
      <div className="space-between bottom-row-city">
        {type === "weeklyItem" && <div className="font-16">{dayAndMonth}</div>}
        {type === "weeklyItem" ? (
          <div>
            {/* {stateMinMaxTemperature?.Minimum?.Value} -
            {stateMinMaxTemperature?.Maximum?.Value} */}
          </div>
        ) : (
          <div>
            {stateSingleTemperature}
            {isFarenheight ? " °F" : " °C"}
          </div>
        )}

        {type !== "weeklyItem" && (
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
        )}
      </div>
    </div>
  );
};
export default City;
