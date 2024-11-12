import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PickingNumberState = {
  numberSelected: number | null;
};

const initialState: PickingNumberState = {
  numberSelected: null,
};

export const numberPicked = createSlice({
  name: "pickingNumber",
  initialState,
  reducers: {
    setNumber: (state, action: PayloadAction<number>) => {
      state.numberSelected = action.payload;
    },
  },
});

// Correct the export here:
export const { setNumber } = numberPicked.actions;
export default numberPicked.reducer;
