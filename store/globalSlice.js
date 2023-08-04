import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey } from "../src/api/api";
import { baseURL } from "../src/api/api";

let initialMobile = window.matchMedia("(max-width: 1250px)");
const initialState = {
  isDarkMode: false,
  favoritesArray: [],
  error: false,
  pending: false,
  isMobile: initialMobile.matches,
  mobileBreakPoint: 1250,
  isFarenheight: true,
  fiveDaysArray: [],
  currentCity: {
    // isFavoriteChosen: false,
    cityCode: '',
    currentCityName: '',
    currentCityTemperature: ''
  },
};

export const getSingleCity = createAsyncThunk('globalSlice/getSingleCity',
  async (payload, thunkAPI) => {
    try {
      let response = await axios(`${baseURL}/currentconditions/v1/${payload.cityCode}?apikey=${apiKey}&language=en-us`)
      return { currentCityTemperature: response?.data?.[0]?.Temperature?.Imperial?.Value, currentCityName: payload?.cityName, isFavoriteChosen: payload.isFavoriteChosen, cityCode: payload.cityCode, weatherText: response?.data?.[0]?.WeatherText }
    } catch (error) {
      thunkAPI.dispatch(errorHandler())
    }
  })

export const getFiveDays = createAsyncThunk('globalSlice/getFiveDays',
  async (payload, thunkAPI) => {
    try {
      // let response = await axios(`${baseURL}/forecasts/v1/daily/5day/${payload.cityCode}?apiKey=${apiKey}&language=en-us`)
      return response?.data?.DailyForecasts
    } catch (error) {
      thunkAPI.dispatch(errorHandler())
    }
  })

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    errorHandler: (state) => {
      state.error = true
      // state.pending = true
    },
    resetError: (state) => {
      state.error = false
      // state.pending = true
    },
    setIsMobile: (state, { payload }) => {
      state.isMobile = payload;
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
      .addCase(getSingleCity.pending, (state) => {
        state.pending = true
      })
      .addCase(getSingleCity.fulfilled, (state, { payload }) => {
        state.pending = false
        state.currentCity = { ...payload }
      })
      .addCase(getSingleCity.rejected, (state) => {
        state.error = true
        state.pending = true
      })
      .addCase(getFiveDays.pending, (state) => {
        state.pending = true
      })
      .addCase(getFiveDays.fulfilled, (state, { payload }) => {
        state.pending = false
        state.fiveDaysArray = payload
      })
      .addCase(getFiveDays.rejected, (state) => {
        state.error = true
        state.pending = true
        console.log('get 5 builder rejcted');
      })
  },
});

export const {
  setCurrentCityFromFavorites,
  setCurrentCity,
  setIsMobile,
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
