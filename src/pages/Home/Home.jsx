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

const Home = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector(globalSelector);
  const {
    fiveDaysArray,
    error,
    currentCity: {
      isFavoriteChosen,
      currentCityName,
      currentCityTemperature,
      cityCode,
    },
  } = reduxState;

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
    dispatch(resetError());
    async function fetchCityName() {
      dispatch(resetError());
      if (currentCityName.length <= 0) {
        try {
          const position = await getCityFromGeolocation();
          const { latitude, longitude } = position;
          const endpointURL =
            "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
          const apiKey = "IeogV01qgqGpHm1XxALIFB1JAtbxBs7E";

          const language = "en-us";
          const toplevel = false;
          const apiUrl = `${endpointURL}?apikey=${apiKey}&q=${latitude}%2C${longitude}&language=${language}&toplevel=${toplevel}`;
          axios
            .get(apiUrl)
            .then((response) => {
              const data = response.data;
              console.log(data);
              dispatch(
                getSingleCity({
                  cityCode: data.Key,
                  cityName: data?.LocalizedName,
                  isFavoriteChosen: false,
                })
              );
              // setTimeout(() => {
              //   dispatch(
              //     getFiveDays({
              //       cityCode: data.Key,
              //     })
              //   );
              // }, 200);
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
    // dispatch(getSingleCity({ cityCode: "215854", cityName: "Tel Aviv" }));
  }, []);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    const inputText = event.target.value;

    const englishLettersRegex = /^[a-zA-Z\s]*$/;

    if (englishLettersRegex.test(inputText)) {
      let inputTextLowerCase = inputText.toLowerCase();
      setStateInputValue(inputTextLowerCase);
    }
  };

  const searchByTextHandler = async () => {
    const apiKey = "IeogV01qgqGpHm1XxALIFB1JAtbxBs7E";
    const language = "en-us";

    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${stateInputValue}&language=${language}`;
    dispatch(resetError());

    try {
      const response = await axios.get(url);
      console.log("Response:", response.data[0].Key);
      dispatch(
        getSingleCity({
          cityCode: response?.data?.[0]?.Key,
          cityName: response?.data?.[0]?.LocalizedName,
          isFavoriteChosen: false,
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
    <div className="home-container">
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
            // isFarenheight={false}
          />
        )}
      </div>
      <div className="flex flex-wrap center gallery-container">
        {fiveDaysArray?.map((forecast, index) => (
          <City
            key={index}
            type={"weeklyItem"}
            data={forecast}
            isFarenheight={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
