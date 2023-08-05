import React, { useState, useEffect } from "react";
import { getDayAndMonth } from "../../utils/helperFunction";
import { weeklyMinMax } from "../../utils/helperFunction";
import sunIcon from "../../assets/images/sun-icon.png";
import moonIcon from "../../assets/images/moon-icon.png";

const CityWeekly = ({
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
  const [stateMinMaxTemperature, setStateMinMaxTemperature] = useState(
    data?.Temperature ?? ""
  );

  const imperialVsMetricToggleHandler = () => {
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
  };

  const dayAndMonth = getDayAndMonth(data?.Date);

  const displayFavorite = () => {
    if (favoriteClickHandler) {
      favoriteClickHandler(cityTemperature, cityName, cityCode, weatherText);
    }
  };

  useEffect(() => {
    setStateMinMaxTemperature(data?.Temperature);
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
        gap: "25px",
      }}
    >
      <div className="city-title bold">
        {stateMinMaxTemperature?.Minimum?.Value}
        {isFarenheight ? "°F" : "°C"}
        <span> - </span>
        {stateMinMaxTemperature?.Maximum?.Value}
        {isFarenheight ? "°F" : "°C"}
      </div>
      {title}
      <div className="gap-20 vertical-flex width-100 bold">
        <div className="gap-12 self-start ">
          <img className="sun-img" src={sunIcon} alt="part cloud" />
          <div>{data?.Day?.IconPhrase}</div>
        </div>
        <div className="gap-17 self-start">
          <img className="moon-img" src={moonIcon} alt="part cloud" />
          <div>{data?.Night?.IconPhrase}</div>
        </div>
      </div>
      <div className="space-between bottom-row-city">
        <div className="font-16">{dayAndMonth}</div>
      </div>
    </div>
  );
};
export default CityWeekly;
