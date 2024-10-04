import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: string;
}
const initialState: CounterState = {
  value: "",
};

export const rangSlice = createSlice({
  name: "rang",
  initialState,

  reducers: {
    newRang: (state: any, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { newRang } = rangSlice.actions;

export default rangSlice.reducer;
