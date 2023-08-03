import { useDispatch } from "react-redux";
import { setUpdateFavoriteArray } from "../../store/globalSlice";

const useToggleFavorite = (cityName, cityTemperature, cityCode) => {
  const dispatch = useDispatch();

  const toggleFavoriteHandler = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isCityFavorite = favorites.some((item) => item.cityCode === cityCode);
    if (isCityFavorite) {
      const updatedFavorites = favorites.filter(
        (item) => item.cityCode !== cityCode
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      dispatch(setUpdateFavoriteArray(updatedFavorites));
    } else {
      favorites.push({ cityName, cityTemperature, cityCode });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      dispatch(setUpdateFavoriteArray(favorites));
    }
  };

  return { toggleFavoriteHandler };
};

export default useToggleFavorite;
