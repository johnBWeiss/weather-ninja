import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { useDispatch } from "react-redux";

let initialMobile = window.matchMedia("(max-width: 1250px)");
const initialState = {
  isMobile: initialMobile.matches,
  mobileBreakPoint: 1250,
  showBurgerMenu: false,

};





export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setIsMobile: (state, { payload }) => {
      state.isMobile = payload;
    },

    setShowBurger: (state) => {
      state.showBurgerMenu = !state.showBurgerMenu;
    },

  },
});

export const {
  setLanguage,
  setIsMobile,
  setShowLogin,
  setShowBurger,
  setShowJoinPopUp,
  setinProfile,
} = globalSlice.actions;

export const globalSelector = (state) => {
  return state.globalSlice;
};

export default globalSlice.reducer;
