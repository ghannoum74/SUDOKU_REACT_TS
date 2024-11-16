import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type chooseDifficulty = {
  difficulty: "easy" | "medium" | "hard" | "";
};

const initialState: chooseDifficulty = {
  difficulty: "",
};

export const difficultyChoosing = createSlice({
  name: "choosingDifficulty",
  initialState,
  reducers: {
    chooseDifficulty: (
      state,
      action: PayloadAction<"easy" | "medium" | "hard" | "">
    ) => {
      state.difficulty = action.payload;
    },
  },
});

// Correct the export here:
export const { chooseDifficulty } = difficultyChoosing.actions;
export default difficultyChoosing.reducer;
