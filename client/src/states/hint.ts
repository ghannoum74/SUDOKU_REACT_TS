import { createSlice } from "@reduxjs/toolkit";

type hintState = {
  hint: number;
};

const initialState: hintState = {
  hint: 3,
};

export const getHint = createSlice({
  name: "hint",
  initialState,
  reducers: {
    decrementHint: (state) => {
      if (state.hint > 0) {
        state.hint -= 1;
      }
    },
    resetHint: (state) => {
      state.hint = 3;
    },
  },
});

export const { decrementHint, resetHint } = getHint.actions;
export default getHint.reducer;
