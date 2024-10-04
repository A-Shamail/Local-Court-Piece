import { configureStore } from "@reduxjs/toolkit";
import rangReducer from "./rangSlice";
import turnReducer from "./turnSlice";

export const reduxStore = configureStore({
  reducer: {
    rang: rangReducer,
    turn: turnReducer,
  },
});
