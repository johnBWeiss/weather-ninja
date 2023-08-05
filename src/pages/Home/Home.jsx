import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import searchIcon from "../../assets/images/search-icon.png";
import City from "../../components/City/City";
import axios from "axios";
import { globalSelector } from "../../../store/globalSlice";
import { getSingleCity } from "../../../store/globalSlice";
import { weeklyArrayShortData } from "../../utils/mockData";
import { getFiveDays } from "../../../store/globalSlice";
import { errorHandler } from "../../../store/globalSlice";
import { resetError } from "../../../store/globalSlice";
import { getRandomErrorMessage, scrollToTop } from "../../utils/helperFunction";

const Home = () => {
  const dispatch = useDispatch();
  const {
    fiveDaysArray,
    error,
    isFarenheight,
    isDarkMode,
    currentCity: {
      currentCityName,
      currentCityTemperature,
      cityCode,
      weatherText,
    },
  } = useSelector(globalSelector);

  const errorMessage = useMemo(() => {
    return error && getRandomErrorMessage(error);
  }, [error]);

  const [stateInputValue, setStateInputValue] = useState("");
  async function getCityFromGeolocation() {
    dispatch(resetError());

    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(new Error("Failed to get geolocation."));
          }
        );
      } else {
        reject(new Error("Geolocation not supported in this browser."));
      }
    });
  }

  useEffect(() => {
    async function fetchCityName() {
      dispatch(resetError());
      if (currentCityName.length <= 0) {
        try {
          const position = await getCityFromGeolocation();
          const { latitude, longitude } = position;
          axios
            .get(
              `https://express-proxy-server-yonatan.onrender.com/getGeoPosition/${latitude}/${longitude}`
            )
            .then((response) => {
              const data = response.data;
              dispatch(
                getSingleCity({
                  cityCode: data?.Key,
                  cityName: data?.LocalizedName,
                  isFavoriteChosen: false,
                })
              );
              dispatch(
                getFiveDays({
                  cityCode: data?.Key,
                })
              );
            })
            .catch((error) => {
              console.error("Error fetching data:", error.message);
              dispatch(errorHandler("getting your geo position"));
            });
        } catch (error) {
          dispatch(errorHandler("getting your geo position"));
        }
      }
    }

    if (currentCityName == "") {
      fetchCityName();
    }
    scrollToTop();
    dispatch(resetError());
  }, []);

  const handleInputChange = (event) => {
    const inputText = event.target.value.toLowerCase();
    const englishLettersRegex = /^[a-zA-Z\s]*$/;
    if (englishLettersRegex.test(inputText)) {
      setStateInputValue(inputText);
    }
  };

  const searchByTextHandler = async () => {
    const url = `https://express-proxy-server-yonatan.onrender.com/searchText/${stateInputValue}`;
    dispatch(resetError());

    try {
      const response = await axios.get(url);

      dispatch(
        getSingleCity({
          cityCode: response?.data?.[0]?.Key,
          cityName: response?.data?.[0]?.LocalizedName,
        })
      );
      dispatch(
        getFiveDays({
          cityCode: response?.data?.[0]?.Key,
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error.message);
      dispatch(errorHandler("searching text"));
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
            e.code === "Enter" && searchByTextHandler();
          }}
          placeholder="Which city will it be?"
        />
      </div>
      <div className="search-button" onClick={searchByTextHandler}>
        Search
      </div>
      <div className="center padding-top-50">
        {error && <h1 className="error-message">{errorMessage}</h1>}
        {currentCityName && (
          <div className="current-forecast-city-container ">
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
      {(error || fiveDaysArray) && currentCityName !== "" && (
        <div className="weekly-forecast-title bold">Weekly Forecast</div>
      )}

      <div className="flex flex-wrap center gallery-container">
        {currentCityName !== "" &&
          (error ? weeklyArrayShortData : fiveDaysArray)?.DailyForecasts?.map(
            (forecast, index) => (
              <City
                key={index}
                type={"weeklyItem"}
                data={forecast}
                isFarenheight={isFarenheight}
                isDarkMode={isDarkMode}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Home;
