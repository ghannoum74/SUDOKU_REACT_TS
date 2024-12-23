import { createSlice } from "@reduxjs/toolkit";

type mistakenumber = {
  mistakesNb: number;
};

const initialState: mistakenumber = {
  mistakesNb: 0,
};

export const setMistakes = createSlice({
  name: "mistakesNumber",
  initialState,
  reducers: {
    incrementMistakeNumber: (state) => {
      state.mistakesNb += 1;
    },
    decrementMistakeNumber: (state) => {
      state.mistakesNb -= 1;
    },
    resetMistakNumber: (state) => {
      state.mistakesNb = 0;
    },
  },
});

// Correct the export here:
export const {
  incrementMistakeNumber,
  decrementMistakeNumber,
  resetMistakNumber,
} = setMistakes.actions;
export default setMistakes.reducer;
