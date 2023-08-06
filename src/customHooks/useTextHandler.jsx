import { useDispatch } from "react-redux";
import axios from "axios";
import {
  getSingleCity,
  getFiveDays,
  setIsPending,
  resetError,
  setSingleError,
} from "../../store/globalSlice";

const useTextHandler = () => {
  const dispatch = useDispatch();

  const textAPIhandler = async (stateInputValue) => {
    dispatch(setIsPending());

    const url = `https://express-proxy-server-yonatan.onrender.com/searchText/${stateInputValue}`;
    dispatch(resetError());
    try {
      const response = await axios.get(url);
      dispatch(
        getSingleCity({
          cityCode: response?.data?.[0]?.Key,
          cityName: response?.data?.[0]?.LocalizedName,
        })
      );
      dispatch(
        getFiveDays({
          cityCode: response?.data?.[0]?.Key,
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error.message);
      dispatch(setSingleError("searching text"));
    }
  };

  return { textAPIhandler };
};
export default useTextHandler;
