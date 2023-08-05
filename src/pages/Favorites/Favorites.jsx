import React, { useEffect } from "react";
import { globalSelector } from "../../../store/globalSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUpdateFavoriteArray } from "../../../store/globalSlice";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/helperFunction";
import { getFiveDays, setCurrentCity } from "../../../store/globalSlice";
import City from "../../components/City/City";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favoritesArray, isFarenheight, isDarkMode } =
    useSelector(globalSelector);

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(setUpdateFavoriteArray(favoritesFromStorage));
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
        isFavoriteChosen: true,
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
      <h1 className="favorites-title padding-top-150 center">Favorites</h1>
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
            type={"singleItem"}
          />
        ))}
      </div>
    </div>
  );
};
export default Favorites;
