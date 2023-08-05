import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import searchIcon from "../../assets/images/search-icon.png";
import City from "../../components/City/City";
import CityWeekly from "../../components/CityWeekly/CityWeekly";
import axios from "axios";
import { globalSelector } from "../../../store/globalSlice";
import { getSingleCity } from "../../../store/globalSlice";
import { getFiveDays } from "../../../store/globalSlice";
import { errorHandler } from "../../../store/globalSlice";
import { resetError } from "../../../store/globalSlice";
import { getRandomErrorMessage, scrollToTop } from "../../utils/helperFunction";
import { setIsPending } from "../../../store/globalSlice";
import { resetPending } from "../../../store/globalSlice";
import earthIcon from "../../assets/images/earth-icon.png";
import CarouselLib from "../../components/Carousel/CarouselLib";

const Home = () => {
  const dispatch = useDispatch();
  const {
    fiveDaysArray,
    error,
    isFarenheight,
    isDarkMode,
    isPending,
    currentCity: {
      currentCityName,
      currentCityTemperature,
      cityCode,
      weatherText,
      isGeoLocation,
    },
  } = useSelector(globalSelector);

  const [stateInputValue, setStateInputValue] = useState("");

  const errorMessage = useMemo(() => {
    return error && getRandomErrorMessage(error);
  }, [error]);
  useEffect(() => {
    async function fetchCityName() {
      dispatch(resetError());
      dispatch(setIsPending());

      if (currentCityName?.length <= 0) {
        try {
          const position = await getCityFromGeolocation();
          const { latitude, longitude } = position;
          axios
            .get(
              `https://express-proxy-server-yonatan.onrender.com/getGeoPosition/${latitude}/${longitude}`
            )
            .then((response) => {
              const data = response.data;
              dispatch(resetPending());
              dispatch(
                getSingleCity({
                  cityCode: data?.Key,
                  cityName: data?.LocalizedName,
                  isGeoLocation: true,
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

  async function getCityFromGeolocation() {
    dispatch(resetError());
    dispatch(setIsPending());

    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            resolve({ latitude, longitude });
          },
          () => {
            reject(new Error("Failed to get geolocation."));
          }
        );
      } else {
        reject(new Error("Geolocation not supported in this browser."));
      }
    });
  }

  const searchByTextHandler = async () => {
    dispatch(setIsPending());

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
            e.code === "Enter" && searchByTextHandler();
          }}
          placeholder="Which city will it be?"
        />
      </div>
      <div className="search-button" onClick={searchByTextHandler}>
        Search
      </div>
      <div className="center padding-top-50">
        {isPending && (
          <img className="spinner" src={earthIcon} alt="earth icon" />
        )}
        {error && <h1 className="error-message">{errorMessage}</h1>}
        {error && (
          <iframe
            src="https://weather-ninja-earth-banner.netlify.app/"
            width="100%"
            height="160"
            className="target-iframe"
          ></iframe>
        )}

        {currentCityName && !isPending && !error && (
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
      {fiveDaysArray?.length > 0 && !isPending && !error && (
        <div className="weekly-forecast-title bold">Weekly Forecast</div>
      )}
      {!isPending && !error && fiveDaysArray?.length > 0 && (
        <div className="desktop-none ">
          <CarouselLib
            carouselItems={fiveDaysArray}
            isFarenheight={isFarenheight}
            isDarkMode={isDarkMode}
          />
        </div>
      )}
      <div className="flex flex-wrap center gallery-container mobile-none">
        {!isPending &&
          !error &&
          fiveDaysArray?.map((forecast) => (
            <CityWeekly
              key={forecast?.Date}
              data={forecast}
              isFarenheight={isFarenheight}
              isDarkMode={isDarkMode}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
