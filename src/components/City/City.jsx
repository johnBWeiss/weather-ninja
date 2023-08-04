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
}) => {
  const { toggleFavoriteHandler } = useToggleFavorite(
    cityName,
    cityTemperature,
    cityCode
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
      // let min, max;
      // if (!isFarenheight) {
      //   min = celsiusToFahrenheit(stateMinMaxTemperature?.Minimum?.Value);
      //   max = celsiusToFahrenheit(stateMinMaxTemperature?.Maximum?.Value);
      // }
      // if (isFarenheight) {
      //   min = fahrenheitToCelsius(data?.Temperature?.Minimum?.Value);
      //   max = fahrenheitToCelsius(data?.Temperature?.Maximum?.Value);
      // }
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

    // dispatch(setToggleDegreeType());
  };

  const dayAndMonth = getDayAndMonth(data?.Date);

  const displayFavorite = () => {
    if (favoriteClickHandler) {
      favoriteClickHandler(cityCode, cityName);
    }
  };

  useEffect(() => {
    console.log(cityTemperature);
    setStateMinMaxTemperature(data?.Temperature);
    setStateSingleTemperature(cityTemperature);
    if (!isFarenheight) {
      imperialVsMetricToggleHandler();
    }
  }, [data, cityTemperature, isFarenheight, cityCode]);

  return (
    <div
      className={`city-container vertical-flex ${
        favoriteClickHandler ? "hoverEffect" : null
      } `}
      onClick={displayFavorite}
      style={{ background: isDarkMode ? "grey" : "white" }}
    >
      <div className="city-title bold">{cityName}</div>
      <div></div>
      {title}
      <div className="vertical-flex ">
        <div className="gap-12">
          <img className="weather-img" src={partCloud} alt="part cloud" />{" "}
        </div>
      </div>
      <div className="space-between bottom-row-city">
        {type === "weeklyItem" && <div>{dayAndMonth}</div>}
        {type === "weeklyItem" ? (
          <div>
            {stateMinMaxTemperature?.Minimum?.Value} -
            {stateMinMaxTemperature?.Maximum?.Value}
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
              toggleFavoriteHandler(e, cityName, cityTemperature, cityCode)
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
