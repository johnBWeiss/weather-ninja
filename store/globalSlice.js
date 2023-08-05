import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isDarkMode: false,
  favoritesArray: [],
  error: false,
  isFarenheight: true,
  fiveDaysArray: false,
  currentCity: {
    cityCode: '',
    currentCityName: '',
    currentCityTemperature: ''
  },
};

export const getSingleCity = createAsyncThunk('globalSlice/getSingleCity',
  async (payload, thunkAPI) => {
    try {
      let response = await axios(`https://express-proxy-server-yonatan.onrender.com/getSingleCity/${payload.cityCode}`)
      return { currentCityTemperature: response?.data?.[0]?.Temperature?.Imperial?.Value, currentCityName: payload?.cityName, isFavoriteChosen: payload.isFavoriteChosen, cityCode: payload.cityCode, weatherText: response?.data?.[0]?.WeatherText }
    } catch (error) {
      thunkAPI.dispatch(errorHandler("getting today's forecast"))
    }
  })

export const getFiveDays = createAsyncThunk('globalSlice/getFiveDays',
  async (payload, thunkAPI) => {
    try {
      let response = await axios(`https://express-proxy-server-yonatan.onrender.com/getFiveDays/${payload.cityCode}`)
      return response?.data?.DailyForecasts
    } catch (error) {
      thunkAPI.dispatch(errorHandler("getting the weekly forecast"))
    }
  })

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    errorHandler: (state, { payload }) => {
      state.error = payload
    },
    resetError: (state) => {
      state.error = false
    },
    setUpdateFavoriteArray: (state, { payload }) => {
      state.favoritesArray = payload;
    },
    setToggleDegreeType: (state) => {
      state.isFarenheight = !state.isFarenheight
    },
    setCurrentCity: (state, { payload }) => {
      state.currentCity = { ...payload };
    },
    setToggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSingleCity.fulfilled, (state, { payload }) => {
        state.pending = false
        state.currentCity = { ...payload }
      })
      .addCase(getSingleCity.rejected, (state) => {
        state.error = "getting data for today's forecast"
        state.pending = true
      })
      .addCase(getFiveDays.fulfilled, (state, { payload }) => {
        state.pending = false
        state.fiveDaysArray = payload
      })
      .addCase(getFiveDays.rejected, (state) => {
        state.error = "getting data for the weekly forecast"
        state.pending = true
      })
  },
});

export const {
  setCurrentCityFromFavorites,
  setCurrentCity,
  errorHandler,
  resetError,
  setUpdateFavoriteArray,
  setToggleDegreeType,
  setToggleDarkMode
} = globalSlice.actions;

export const globalSelector = (state) => {
  return state.globalSlice;
};

export default globalSlice.reducer;
