import { createSlice } from "@reduxjs/toolkit";

type selvedState = {
  isSolved: boolean;
  isReadIt: boolean;
  isPending: boolean;
};

const initialState: selvedState = {
  isSolved: false,
  isReadIt: false,
  isPending: false,
};

export const solveCustomSudoku = createSlice({
  name: "solveCustomBoard",
  initialState,
  reducers: {
    solveCustomBoard: (state, action) => {
      state.isSolved = action.payload;
    },
    imageDataGetIt: (state, action) => {
      state.isReadIt = action.payload;
    },
    setIsPending: (state, action) => {
      state.isPending = action.payload;
    },
  },
});

// Correct the export here:
export const { solveCustomBoard, imageDataGetIt, setIsPending } =
  solveCustomSudoku.actions;
export default solveCustomSudoku.reducer;
