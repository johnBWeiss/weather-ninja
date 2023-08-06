import { useDispatch } from "react-redux";
import axios from "axios";
import {
  getSingleCity,
  getFiveDays,
  setIsPending,
  resetError,
  errorHandler,
  resetPending,
} from "../../store/globalSlice";

const useGeoLocation = () => {
  const dispatch = useDispatch();
  const getCityFromGeolocation = async () => {
    dispatch(resetError());
    dispatch(setIsPending());

    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            resolve({ latitude, longitude });
          },
          () => {
            reject(new Error("Failed to get geolocation."));
          }
        );
      } else {
        reject(new Error("Geolocation not supported in this browser."));
      }
    });
  };

  const getGeoPositionWeather = async (currentCityName) => {
    dispatch(resetError());
    dispatch(setIsPending());

    if (currentCityName?.length <= 0) {
      try {
        const position = await getCityFromGeolocation();
        const { latitude, longitude } = position;
        axios
          .get(
            `https://express-proxy-server-yonatan.onrender.com/getGeoPosition/${latitude}/${longitude}`
          )
          .then((response) => {
            const data = response.data;
            dispatch(resetPending());
            dispatch(
              getSingleCity({
                cityCode: data?.Key,
                cityName: data?.LocalizedName,
                isGeoLocation: true,
              })
            );
            dispatch(
              getFiveDays({
                cityCode: data?.Key,
              })
            );
          })
          .catch((error) => {
            console.error("Error fetching data:", error.message);
            dispatch(errorHandler("getting your geo position"));
          });
      } catch (error) {
        dispatch(errorHandler("getting your geo position"));
      }
    }
  };

  return { getGeoPositionWeather };
};
export default useGeoLocation;
