import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { useDispatch } from "react-redux";
import axios from "axios";

const baseURL = 'http://dataservice.accuweather.com'
const apikey = 'IeogV01qgqGpHm1XxALIFB1JAtbxBs7E'

let initialMobile = window.matchMedia("(max-width: 1250px)");
const initialState = {
  error: false,
  pending: false,
  isMobile: initialMobile.matches,
  mobileBreakPoint: 1250,
  isFarentHeight: true,
  currentCity: {
    isFavoriteChosen: false,
    cityCode: '',
    currentCityName: '',
    currentCItyCode: '',
    currentCityTemperature: ''
    // minTemperature: '',
    // maxTemperature: '',
  },
  fiveDaysArray: []


};

export const getSingleCity = createAsyncThunk('globalSlice/getSingleCity',

  async (payload, thunkAPI) => {
    console.log(payload.cityCode);
    try {
      let response = await axios(`${baseURL}/currentconditions/v1/${payload.cityCode}?apikey=${apikey}&language=en-us`)
      return { currentCityTemperature: response?.data?.[0]?.Temperature?.Imperial?.Value, currentCityName: payload?.cityName, isFavoriteChosen: payload.isFavoriteChosen, cityCode: payload.cityCode }
    } catch (error) {
      /*
       I use both the try catch method and the builder rejected method to catch errors,
       because the rejected method does not cover all instances of errors. 
      */
      thunkAPI.dispatch(errorHandler())
    }
  })
export const getFiveDays = createAsyncThunk('globalSlice/getFiveDays',

  async (payload, thunkAPI) => {
    console.log(payload.cityCode);
    try {
      let response = await axios(`${baseURL}/forecasts/v1/daily/5day/${payload.cityCode}?apikey=${apikey}&language=en-us`)
      console.log(response?.data);
      return response?.data?.DailyForecasts
    } catch (error) {
      /*
       I use both the try catch method and the builder rejected method to catch errors,
       because the rejected method does not cover all instances of errors. 
      */
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
    // setCurrentCityFromFavorites: (state, { payload }) => {
    //   state.currentCity = { ...payload, isFavoriteChosen: true };
    // },
    setCurrentCity: (state, { payload }) => {
      state.currentCity = { ...payload };
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
        // state.getSingleCity = { code: payload[0].Key, name:payload[0].LocalizedName }
      })
      .addCase(getSingleCity.rejected, (state) => {
        state.error = true
        state.pending = true
      })
      .addCase(getFiveDays.pending, (state) => {
        state.pending = true
      })
      .addCase(getFiveDays.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.pending = false
        state.fiveDaysArray = payload
      })
      .addCase(getFiveDays.rejected, (state) => {
        state.error = true
        state.pending = true
      })

  },
});

export const {
  setCurrentCityFromFavorites,
  setCurrentCity,
  setIsMobile,
  errorHandler,
  resetError

} = globalSlice.actions;

export const globalSelector = (state) => {
  return state.globalSlice;
};

export default globalSlice.reducer;
