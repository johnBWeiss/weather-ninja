import React, { useEffect } from "react";
import { globalSelector } from "../../../store/globalSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUpdateFavoriteArray } from "../../../store/globalSlice";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/helperFunction";
import { getFiveDays, getSingleCity } from "../../../store/globalSlice";
import City from "../../components/City/City";

const Favorites = () => {
  const navigate = useNavigate();
  // const reduxState = useSelector(globalSelector);
  const dispatch = useDispatch();
  const { favoritesArray, isFarenheight } = useSelector(globalSelector);

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
    <div className="gradual-animation">
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
          />
        ))}
      </div>
    </div>
  );
};
export default Favorites;
