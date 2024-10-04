import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}
const initialState: CounterState = {
  value: 0,
};

export const turnSlice = createSlice({
  name: "turn",
  initialState,

  reducers: {
    updateTurn: (state: any, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { updateTurn } = turnSlice.actions;

export default turnSlice.reducer;
