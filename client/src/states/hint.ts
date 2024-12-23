import { createSlice } from "@reduxjs/toolkit";

type hintState = {
  hint: number;
  isHinted: boolean;
};

const initialState: hintState = {
  hint: 3,
  isHinted: false,
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
    isHinted: (state) => {
      if (state.hint > 0) {
        state.isHinted = !state.isHinted;
      }
    },
    resetHint: (state) => {
      state.hint = 3;
    },
  },
});

export const { decrementHint, resetHint, isHinted } = getHint.actions;
export default getHint.reducer;
