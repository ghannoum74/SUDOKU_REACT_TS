import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type mistakenumber = {
  score: number | null;
};

const initialState: mistakenumber = {
  score: 0,
};

export const sudokuScore = createSlice({
  name: "sudokuScore",
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
  },
});

// Correct the export here:
export const { setScore } = sudokuScore.actions;
export default sudokuScore.reducer;
