import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getRandomErrorMessage, scrollToTop } from "../../utils/helperFunction";
import { globalSelector } from "../../../store/globalSlice";
import useTextHandler from "../../customHooks/useTextHandler";
import useGeoLocation from "../../customHooks/useGeoLocation";
import searchIcon from "../../assets/images/search-icon.png";
import City from "../../components/City/City";
import earthIcon from "../../assets/images/earth-icon.png";
import FiveDays from "../../components/FiveDays/FiveDays";
const Home = () => {
  const [stateInputValue, setStateInputValue] = useState("");

  const { textAPIhandler } = useTextHandler();
  const { getGeoPositionWeather } = useGeoLocation();

  const {
    fiveDaysArray,
    error,
    isFarenheight,
    isDarkMode,
    isPending,
    singleError,
    weeklyError,
    currentCity: {
      currentCityName,
      currentCityTemperature,
      cityCode,
      weatherText,
      isGeoLocation,
    },
  } = useSelector(globalSelector);

  const errorMessage = useMemo(() => {
    return error && getRandomErrorMessage(error);
  }, [error]);

  useEffect(() => {
    if (currentCityName == "") {
      getGeoPositionWeather();
    }
    scrollToTop();
  }, []);

  const handleInputChange = (event) => {
    const inputText = event.target.value.toLowerCase();
    const englishLettersRegex = /^[a-zA-Z\s]*$/;
    if (englishLettersRegex.test(inputText)) {
      setStateInputValue(inputText);
    }
  };

  return (
    <div
      className="home-container gradual-animation"
      style={{ color: isDarkMode ? "white" : "black", transition: "0.6s" }}
    >
      <div className="flex relative center">
        <img className="search-icon" src={searchIcon} alt="search icon" />

        <input
          className="search-input"
          type="text"
          value={stateInputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            e.code === "Enter" && textAPIhandler(stateInputValue);
          }}
          placeholder="Which city will it be?"
        />
      </div>
      <div
        className="search-button"
        onClick={() => textAPIhandler(stateInputValue)}
      >
        Search
      </div>
      <div className="center padding-top-50">
        {isPending && (
          <div className="gap-16 vertical-flex">
            <div className="font-24 bold">Loading your location</div>{" "}
            <img className="spinner" src={earthIcon} alt="earth icon" />
          </div>
        )}
        {error && (
          <>
            <h1 className="error-message">{errorMessage}</h1>
            <iframe
              src="https://weather-ninja-earth-banner.netlify.app/"
              width="100%"
              height="220"
              className="target-iframe"
            ></iframe>
          </>
        )}

        {currentCityName && !isPending && !singleError && (
          <div className="current-forecast-city-container ">
            {isGeoLocation && (
              <div className="current-location-title bold">
                current location
              </div>
            )}
            <City
              cityName={currentCityName ?? ""}
              cityTemperature={currentCityTemperature ?? ""}
              type={"singleItem"}
              cityCode={cityCode}
              isFarenheight={isFarenheight}
              isDarkMode={isDarkMode}
              weatherText={weatherText}
            />
          </div>
        )}
      </div>
      {fiveDaysArray?.length > 0 && !isPending && !weeklyError && (
        <FiveDays
          fiveDaysArray={fiveDaysArray}
          isFarenheight={isFarenheight}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default Home;
