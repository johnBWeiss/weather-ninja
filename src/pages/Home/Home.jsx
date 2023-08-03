import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import searchIcon from "../../assets/images/search-icon.png";
import City from "../../components/City/City";
import axios from "axios";
import { globalSelector } from "../../../store/globalSlice";
import { setCurrentCity } from "../../../store/globalSlice";
import { getSingleCity } from "../../../store/globalSlice";
import { weeklyArrayShortData } from "../../utils/mockData";
const Home = () => {
  const dispatch=useDispatch()
  const reduxState = useSelector(globalSelector);
  const {
    currentCity: {
      isFavoriteChosen,
      currentCityName,
      currentCityTemperature,
    },
  } = reduxState;

  const [inputValue, setInputValue] = useState("");
  const [currentCity, setCurrentCity] = useState(false);


  async function getCityFromGeolocation() {
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
            // setCurrentCity(data);
            dispatch(getSingleCity({ cityCode: data.Key, cityName: data?.LocalizedName }));
          })
          .catch((error) => {
            console.error("Error fetching data:", error.message);
          });
      } catch (error) {
        console.log("Error getting geolocation:", error.message);
      }
    }
    // if (!isFavoriteChosen) {
      fetchCityName();
    // }

    // dispatch(getSingleCity({ cityCode: "215854", cityName: "Tel Aviv" }));
  }, []);

  const handleInputChange = (event) => {
    const inputText = event.target.value;

    // Regular expression to allow only English letters (a-z, A-Z)
    const englishLettersRegex = /^[a-zA-Z]*$/;

    if (englishLettersRegex.test(inputText)) {
      let inputTextLowerCase = inputText.toLowerCase();
      setInputValue(inputTextLowerCase);
    }
  };



  return (
    <div className="home-container">
      <div className="flex relative center">
        <img className="search-icon" src={searchIcon} alt="search icon" />

        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for a city"
        />
      </div>
      <div className="center padding-top-100">
        <City
          cityName={currentCityName ?? ""}
          cityTemperature={currentCityTemperature ?? ""}
          type={"singleItem"}
          // isFarenheight={false}
        />
      </div>
      <div className="flex flex-wrap center gallery-container">
        {weeklyArrayShortData?.DailyForecasts?.map((forecast, index) => (
          <City key={index} type={"weeklyItem"} data={forecast} isFarenheight={true} />
        ))}
      </div>
    </div>
  );
};

export default Home;
