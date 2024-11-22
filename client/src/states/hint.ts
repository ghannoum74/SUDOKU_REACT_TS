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
    setHint: (state) => {
      if (state.hint > 0) {
        state.hint -= 1;
      }
    },
  },
});

export const { setHint } = getHint.actions;
export default getHint.reducer;
