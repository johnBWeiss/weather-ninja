import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { useDispatch } from "react-redux";
import axios from "axios";

let initialMobile = window.matchMedia("(max-width: 1250px)");
const initialState = {
  error: false,
  pending: false,
  isMobile: initialMobile.matches,
  mobileBreakPoint: 1250,
  showBurgerMenu: false,
  currentCity: {
    isFavoriteChosen: false,
    cityCode: '',
    name: '',
    minTemperature: '',
    maxTemperature: '',
  }

};

export const getSingleCity = createAsyncThunk('globalSlice/getSingleCity',
<
  async ( payload , thunkAPI) => {
    console.log(payload.cityCode);
    try {
      let response = await axios(`http://dataservice.accuweather.com/currentconditions/v1/${payload.cityCode}?apikey=IeogV01qgqGpHm1XxALIFB1JAtbxBs7E&language=en-us`)
      return { currentCityTemperature: response?.data?.[0]?.Temperature?.Imperial?.Value, currentCityName: payload?.cityName }
    } catch (error) {
      /*
       I use both the try catch method and the builder rejected method to catch errors,
       because the rejected method does not cover all instances of errors. 
      */
      // thunkAPI.dispatch(errorHandler())
    }
  })



export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    errorHandler: (state) => {
      // state.error = ''
      // state.pending = true
    },
    setIsMobile: (state, { payload }) => {
      state.isMobile = payload;
    },
    setCurrentCityFromFavorites: (state, { payload }) => {
      state.currentCity = { ...payload, isFavoriteChosen: true };
    },
    setCurrentCity: (state, { payload }) => {
      state.currentCity = { ...payload, isFavoriteChosen: false };
    },



  },

  extraReducers: (builder) => {
    builder
      .addCase(getSingleCity.pending, (state) => {
        state.pending = true
      })
      .addCase(getSingleCity.fulfilled, (state, { payload }) => {
        state.pending = false
        state.currentCity={...payload,isFavoriteChosen:false}
        // state.getSingleCity = { code: payload[0].Key, name:payload[0].LocalizedName }
      })
      .addCase(getSingleCity.rejected, (state) => {
        state.error = '?'
        state.pending = true


      })

  },
});

export const {
  setCurrentCityFromFavorites,
  setCurrentCity,
  setIsMobile,

} = globalSlice.actions;

export const globalSelector = (state) => {
  return state.globalSlice;
};

export default globalSlice.reducer;
