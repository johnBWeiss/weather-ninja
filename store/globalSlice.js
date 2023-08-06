import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isPending: false,
  isDarkMode: false,
  favoritesArray: [],
  // error: false,
  singleError: false,
  weeklyError: false,
  isFarenheight: true,
  fiveDaysArray: [],
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
      return { currentCityTemperature: response?.data?.[0]?.Temperature?.Imperial?.Value, currentCityName: payload?.cityName, isFavoriteChosen: payload?.isFavoriteChosen, cityCode: payload?.cityCode, weatherText: response?.data?.[0]?.WeatherText, isGeoLocation: payload?.isGeoLocation }
    } catch (error) {
      thunkAPI.dispatch(setSingleError("getting today's forecast"))
    }
  })

export const getFiveDays = createAsyncThunk('globalSlice/getFiveDays',
  async (payload, thunkAPI) => {
    try {
      let response = await axios(`https://express-proxy-server-yonatan.onrender.com/getFiveDays/${payload.cityCode}`)
      return response?.data?.DailyForecasts
    } catch (error) {
      thunkAPI.dispatch(setWeeklyError("getting the weekly forecast"))
    }
  })

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    errorHandler: (state, { payload }) => {
      state.error = payload
      state.isPending = false
    },
    setSingleError: (state, { payload }) => {
      state.singleError = true
      state.error = payload
      state.isPending = false
    },
    setWeeklyError: (state, { payload }) => {
      state.weeklyError = true
      state.error = payload

      state.isPending = false
    },
    resetError: (state) => {
      state.error = false
      state.singleError = false
      state.weeklyError = false
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
    setIsPending: (state) => {
      state.isPending = true
    },
    resetPending: (state) => {
      state.isPending = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSingleCity.pending, (state) => {
        state.isPending = true
      })
      .addCase(getSingleCity.fulfilled, (state, { payload }) => {
        state.currentCity = payload
      })
      .addCase(getSingleCity.rejected, (state) => {
        state.error = true
        state.singleError = "getting data for today's forecast"
        state.isPending = false
      })
      .addCase(getFiveDays.pending, (state) => {
        state.isPending = true
      })
      .addCase(getFiveDays.fulfilled, (state, { payload }) => {
        state.isPending = false
        state.fiveDaysArray = payload
      })
      .addCase(getFiveDays.rejected, (state) => {
        state.weeklyError = "getting data for the weekly forecast"
        state.isPending = false
        state.error = true

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
  setToggleDarkMode,
  setIsPending,
  resetPending,
  setSingleError,
  setWeeklyError
} = globalSlice.actions;

export const globalSelector = (state) => {
  return state.globalSlice;
};

export default globalSlice.reducer;
