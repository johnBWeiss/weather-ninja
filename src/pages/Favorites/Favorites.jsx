import React, { useEffect, useState } from "react";
import {
  globalSelector,
  setIsPending,
  resetPending,
  setSingleError,
} from "../../../store/globalSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUpdateFavoriteArray } from "../../../store/globalSlice";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/helperFunction";
import { getFiveDays, setCurrentCity } from "../../../store/globalSlice";
import axios from "axios";
import City from "../../components/City/City";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFarenheight, isDarkMode } = useSelector(globalSelector);

  // const { favoritesArray, isFarenheight, isDarkMode } =
  //   useSelector(globalSelector);

  const [favoritesArray, setfavoritesArray] = useState([]);

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavoritesArray = [];

    const updateStorage = async () => {
      console.log("in axios");
      console.log(favoritesFromStorage);
      for (let i = 0; i < favoritesFromStorage.length; i++) {
        try {
          let response = await axios(
            `https://express-proxy-server-yonatan.onrender.com/getSingleCity/${favoritesFromStorage[i].cityCode}`
          );

          updatedFavoritesArray.push({
            ...favoritesFromStorage[i],
            cityTemperature: response?.data?.[0]?.Temperature?.Imperial?.Value,
            weatherText: response?.data?.[0]?.WeatherText,
          });
          setfavoritesArray(updatedFavoritesArray);
        } catch (error) {
          console.log(error);
          const favoritesFromStorage =
            JSON.parse(localStorage.getItem("favorites")) || [];
          setfavoritesArray(favoritesFromStorage);
        }
      }
    };

    updateStorage();

    dispatch(setUpdateFavoriteArray(favoritesFromStorage));
    scrollToTop();
  }, [dispatch]);

  // useEffect(() => {}, [favoritesArray]);

  const favoriteClickHandler = (
    currentCityTemperature,
    currentCityName,
    cityCode,
    weatherText
  ) => {
    dispatch(
      setCurrentCity({
        currentCityName,
        currentCityTemperature,
        cityCode,
        weatherText,
      })
    );
    dispatch(getFiveDays({ cityCode }));
    navigate("/");
  };

  return (
    <div
      className="gradual-animation"
      style={{ color: isDarkMode ? "white" : "black", transition: "0.6s" }}
    >
      <h1 className="favorites-title padding-top-200 center">Favorites</h1>
      <div className="flex flex-wrap center gallery-container">
        {favoritesArray?.map((value) => (
          <City
            key={value?.cityCode}
            cityName={value?.cityName}
            cityCode={value?.cityCode}
            cityTemperature={value?.cityTemperature}
            favoriteClickHandler={favoriteClickHandler}
            isFarenheight={isFarenheight}
            isDarkMode={isDarkMode}
            weatherText={value?.weatherText}
          />
        ))}
      </div>
    </div>
  );
};
export default Favorites;
