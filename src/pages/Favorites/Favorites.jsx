import React, { useState, useEffect } from "react";
import City from "../../components/City/City";
import { resetError } from "../../../store/globalSlice";
import { globalSelector } from "../../../store/globalSlice";
import { useSelector } from "react-redux";

const Favorites = () => {
  const reduxState = useSelector(globalSelector);
  console.log(reduxState);
  const { favoritesArray } = reduxState;
  console.log(favoritesArray);
  // console.log(updateFavoritesArray);
  // const [favoritesArray, setFavoritesArray] = useState([]);
  // const updateFavoritesState = () => {
  //   const favoritesFromStorage =
  //     JSON.parse(localStorage.getItem("favorites")) || [];
  //   setFavoritesArray(favoritesFromStorage);
  // };

  // useEffect(() => {
  //   updateFavoritesState();
  // }, [updateFavoritesArray]);

  return (
    <>
      <h1 className="favorites-title padding-top-300 center">Favorites</h1>
      <div className="flex flex-wrap center gallery-container">
        {favoritesArray?.map((value, index) => (
          <City
            key={index}
            isFarenheight={true}
            cityName={value.cityName}
            cityCode={value.cityCode}
            cityTemperature={value.cityTemperature}
          />
        ))}
      </div>
    </>
  );
};
export default Favorites;
