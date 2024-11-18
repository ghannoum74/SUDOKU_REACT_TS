import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type mistakenumber = {
  score: number;
  level: "easy" | "medium" | "hard" | "expert" | "";
};

const initialState: mistakenumber = {
  score: 0,
  level: "",
};

export const sudokuScore = createSlice({
  name: "sudokuScore",
  initialState,
  reducers: {
    setScore: (
      state,
      action: PayloadAction<"easy" | "medium" | "hard" | "expert">
    ) => {
      switch (action.payload) {
        case "easy": {
          state.score += 50;
          break;
        }
        case "medium": {
          state.score += 100;
          break;
        }
        case "hard": {
          state.score += 150;
          break;
        }
        case "expert": {
          state.score += 250;
          break;
        }
        default: {
          break;
        }
      }
    },
  },
});

// Correct the export here:
export const { setScore } = sudokuScore.actions;
export default sudokuScore.reducer;
