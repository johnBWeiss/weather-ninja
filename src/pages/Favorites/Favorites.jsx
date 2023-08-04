import React, { useState, useEffect } from "react";
import City from "../../components/City/City";
import {
  getFiveDays,
  getSingleCity,
  resetError,
} from "../../../store/globalSlice";
import { globalSelector } from "../../../store/globalSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUpdateFavoriteArray } from "../../../store/globalSlice";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/helperFunction";

const Favorites = () => {
  const navigate = useNavigate();
  const reduxState = useSelector(globalSelector);
  const dispatch = useDispatch();
  const { favoritesArray, isFarenheight } = reduxState;

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(setUpdateFavoriteArray(favoritesFromStorage));
    scrollToTop();
  }, [dispatch]);

  const favoriteClickHandler = (cityCode, cityName) => {
    dispatch(getSingleCity({ cityCode, cityName }));
    dispatch(getFiveDays({ cityCode }));
    navigate("/");
  };

  return (
    <>
      <h1 className="favorites-title padding-top-300 center">Favorites</h1>
      <div className="flex flex-wrap center gallery-container">
        {favoritesArray?.map((value, index) => (
          <City
            key={index}
            cityName={value.cityName}
            cityCode={value.cityCode}
            cityTemperature={value.cityTemperature}
            favoriteClickHandler={favoriteClickHandler}
            isFarenheight={isFarenheight}
          />
        ))}
      </div>
    </>
  );
};
export default Favorites;
