import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import searchIcon from "../../assets/images/search-icon.png";
import City from "../../components/City/City";
import axios from "axios";
import { globalSelector } from "../../../store/globalSlice";
import { setCurrentCity } from "../../../store/globalSlice";
import { getSingleCity } from "../../../store/globalSlice";
import { weeklyArrayShortData } from "../../utils/mockData";
import { getFiveDays } from "../../../store/globalSlice";
import { errorHandler } from "../../../store/globalSlice";
import { resetError } from "../../../store/globalSlice";
import { getRandomErrorMessage, scrollToTop } from "../../utils/helperFunction";
import { apiKey } from "../../api/api";
import { baseURL } from "../../api/api";
import { geoPositionURL } from "../../api/api";
import { searchByTextURL } from "../../api/api";

const Home = () => {
  const dispatch = useDispatch();
  // const reduxState = useSelector(globalSelector);
  const {
    fiveDaysArray,
    error,
    isFarenheight,
    isDarkMode,
    currentCity: {
      isFavoriteChosen,
      currentCityName,
      currentCityTemperature,
      cityCode,
    },
  } = useSelector(globalSelector);

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
              `${geoPositionURL}?apikey=${apiKey}&q=${latitude}%2C${longitude}&language=en-us&toplevel=false`
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
                  cityCode: data.Key,
                })
              );
            })
            .catch((error) => {
              console.error("Error fetching data:", error.message);
              dispatch(errorHandler());
            });
        } catch (error) {
          // console.log("Error getting geolocation:", error.message);
          dispatch(errorHandler());
        }
      }

      // if (isFavoriteChosen) {
      //   dispatch(
      //     getFiveDays({
      //       cityCode: cityCode,
      //     })
      //   );
      // }
    }

    if (currentCityName == "") {
      // fetchCityName();
    }
    scrollToTop();
    dispatch(resetError());

    // dispatch(getSingleCity({ cityCode: "215854", cityName: "Tel Aviv" }));
  }, []);

  const handleInputChange = (event) => {
    const inputText = event.target.value.toLowerCase();
    const englishLettersRegex = /^[a-zA-Z\s]*$/;
    if (englishLettersRegex.test(inputText)) {
      // let inputTextLowerCase = inputText.toLowerCase();
      setStateInputValue(inputText);
    }
  };

  const searchByTextHandler = async () => {
    // const apiKey = "ps9T93lqmdD16AcRRA6Cuq83mABQMy4O";
    // const language = "en-us";
    const url = `${searchByTextURL}?apikey=${apiKey}&q=${stateInputValue}&language=en-us`;
    dispatch(resetError());

    try {
      const response = await axios.get(url);
      console.log("Response:", response.data[0].Key);
      dispatch(
        getSingleCity({
          cityCode: response?.data?.[0]?.Key,
          cityName: response?.data?.[0]?.LocalizedName,
          // isFavoriteChosen: false,
        })
      );
      dispatch(
        getFiveDays({
          cityCode: response?.data?.[0]?.Key,
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error.message);
      dispatch(errorHandler());
    }
  };

  return (
    <div className="home-container gradual-animation">
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
          placeholder="Search for a city and press enter"
        />
      </div>
      <div className="center padding-top-100">
        {error && <h1 className="error-message">{getRandomErrorMessage()}</h1>}

        {!error && currentCityName && (
          <City
            cityName={currentCityName ?? ""}
            cityTemperature={currentCityTemperature ?? ""}
            type={"singleItem"}
            cityCode={cityCode}
            isFarenheight={isFarenheight}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
      <div className="flex flex-wrap center gallery-container">
        {fiveDaysArray?.map((forecast, index) => (
          <City
            key={index}
            type={"weeklyItem"}
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
