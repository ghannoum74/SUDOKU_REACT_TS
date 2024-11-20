import { createSlice } from "@reduxjs/toolkit";

type congratsState = {
  isFinished: boolean;
};

const initialState: congratsState = {
  isFinished: false,
};

export const setSudokuFinished = createSlice({
  name: "finishSUdoku",
  initialState,
  reducers: {
    setGameFinished: (state, action) => {
      state.isFinished = action.payload;
    },
  },
});

// Correct the export here:
export const { setGameFinished } = setSudokuFinished.actions;
export default setSudokuFinished.reducer;
