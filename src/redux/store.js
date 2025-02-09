import { configureStore } from "@reduxjs/toolkit";
import offsetReducer from "./offsetSlice";

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
  },
});