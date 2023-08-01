import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";

// require("babel-polyfill");

export const store = configureStore({
  reducer: {  globalSlice, },
});


