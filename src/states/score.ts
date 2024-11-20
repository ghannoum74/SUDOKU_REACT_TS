import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type mistakenumber = {
  score: number;
  level: "easy" | "medium" | "hard" | "expert" | "";
  isSolved: boolean;
};

const initialState: mistakenumber = {
  score: 0,
  level: "easy",
  isSolved: false,
};

export const sudokuScore = createSlice({
  name: "sudokuScore",
  initialState,
  reducers: {
    setScore: (
      state,
      action: PayloadAction<"easy" | "medium" | "hard" | "expert" | "">
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
          state.score = 0;
          break;
        }
      }
    },

    resetScore: (state) => {
      state.score = 0;
    },
    checkScore: (
      state,
      action: PayloadAction<"easy" | "medium" | "hard" | "expert" | "">
    ) => {
      state.isSolved = false;
      switch (action.payload) {
        case "easy": {
          state.isSolved = state.score === 1500;
          break;
        }
        case "medium": {
          state.isSolved = state.score === 5000;
          break;
        }
        case "hard": {
          state.isSolved = state.score === 9000;
          break;
        }
        case "expert": {
          state.isSolved = state.score === 18750;
          break;
        }
        default: {
          state.isSolved = false;
          break;
        }
      }
    },
  },
});

// Correct the export here:
export const { setScore, resetScore, checkScore } = sudokuScore.actions;
export default sudokuScore.reducer;
