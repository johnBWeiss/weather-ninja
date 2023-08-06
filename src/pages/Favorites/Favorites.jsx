import React, { useEffect, useState } from "react";
import { globalSelector, setIsPending } from "../../../store/globalSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/helperFunction";
import { getFiveDays, setCurrentCity } from "../../../store/globalSlice";
import earthIcon from "../../assets/images/earth-icon.png";
import axios from "axios";
import City from "../../components/City/City";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFarenheight, isDarkMode } = useSelector(globalSelector);

  const [favoritesArray, setfavoritesArray] = useState([]);
  const [localFavoriteError, setLocalFavoriteError] = useState(false);
  const [localPending, setLocalPending] = useState(false);

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const updateStorage = async () => {
      const favoritesFromStorage =
        JSON.parse(localStorage.getItem("favorites")) || [];
      let updatedFavoritesArray = [];

      const apiCalls = favoritesFromStorage.map(async (v) => {
        try {
          let response = await axios(
            `https://express-proxy-server-yonatan.onrender.com/getSingleCity/${v.cityCode}`
          );
          return {
            ...v,
            cityTemperature: response?.data?.[0]?.Temperature?.Imperial?.Value,
            weatherText: response?.data?.[0]?.WeatherText,
          };
        } catch (error) {
          console.log(error);
          setLocalFavoriteError(
            "There was an error updating your favorite locations, here are the last saved version of them"
          );
          return v;
        }
      });
      try {
        setLocalPending(true);
        const results = await Promise.all(apiCalls);
        updatedFavoritesArray = results;
        setLocalPending(false);
      } catch (error) {
        setLocalPending(false);

        setLocalFavoriteError(
          "There was an error updating your favorite locations, here are the last saved version of them"
        );
        updatedFavoritesArray = favoritesFromStorage;
        // setfavoritesArray(favoritesFromStorage);
      }

      setfavoritesArray(updatedFavoritesArray);
    };

    updateStorage();

    scrollToTop();
  }, [dispatch]);

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
      {localPending && (
        <div className="gap-16 vertical-flex">
          <div className="font-24 bold">Updating your favroite locations</div>
          <img className="spinner" src={earthIcon} alt="earth icon" />
        </div>
      )}
      {localFavoriteError && (
        <div className="error-message favorites-error">
          {localFavoriteError}
        </div>
      )}
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
