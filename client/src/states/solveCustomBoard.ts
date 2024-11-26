import { createSlice } from "@reduxjs/toolkit";

type selvedState = {
  isSolved: boolean;
};

const initialState: selvedState = {
  isSolved: false,
};

export const solveCustomSudoku = createSlice({
  name: "solveCustomBoard",
  initialState,
  reducers: {
    solveCustomBoard: (state, action) => {
      state.isSolved = action.payload;
    },
  },
});

// Correct the export here:
export const { solveCustomBoard } = solveCustomSudoku.actions;
export default solveCustomSudoku.reducer;
