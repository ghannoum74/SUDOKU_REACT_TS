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
    setMistakeNumber: (state) => {
      state.mistakesNb += 1;
    },
  },
});

// Correct the export here:
export const { setMistakeNumber } = setMistakes.actions;
export default setMistakes.reducer;
