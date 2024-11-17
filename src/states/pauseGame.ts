import { createSlice } from "@reduxjs/toolkit";

type pauseType = {
  isPaused: boolean | false;
};

const initialState: pauseType = {
  isPaused: false,
};

export const pauseGame = createSlice({
  name: "pauseGame",
  initialState,
  reducers: {
    setIsPause: (state) => {
      state.isPaused = !state.isPaused;
    },
  },
});

// Correct the export here:
export const { setIsPause } = pauseGame.actions;
export default pauseGame.reducer;
