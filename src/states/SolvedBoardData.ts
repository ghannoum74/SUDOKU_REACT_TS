import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Cell = {
  value: number | null;
  calculate: boolean;
  id: string;
  row: number;
  column: number;
  block: number;
  matrix: string;
  unchangebale: boolean;
};

type SolvedState = {
  solvedBoardData: Cell[][];
};

const initialState: SolvedState = {
  solvedBoardData: [],
};

export const solvedData = createSlice({
  name: "dataSolved",
  initialState,
  reducers: {
    setSolvedData: (state, action: PayloadAction<Cell[][]>) => {
      state.solvedBoardData = action.payload;
    },
  },
});

// Correct the export here:
export const { setSolvedData } = solvedData.actions;
export default solvedData.reducer;
