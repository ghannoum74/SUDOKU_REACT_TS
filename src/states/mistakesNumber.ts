import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type mistakenumber = {
  mistakesNb: number | null;
};

const initialState: mistakenumber = {
  mistakesNb: 0,
};

export const setMistakes = createSlice({
  name: "mistakesNumber",
  initialState,
  reducers: {
    setMistakeNumber: (state, action: PayloadAction<number>) => {
      state.mistakesNb = action.payload;
    },
  },
});

// Correct the export here:
export const { setMistakeNumber } = setMistakes.actions;
export default setMistakes.reducer;
