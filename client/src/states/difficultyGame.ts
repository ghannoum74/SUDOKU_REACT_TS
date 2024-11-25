import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type chooseDifficulty = {
  difficulty: "easy" | "medium" | "hard" | "expert" | "custom" | "";
};

const initialState: chooseDifficulty = {
  difficulty: "easy",
};

export const difficultyChoosing = createSlice({
  name: "choosingDifficulty",
  initialState,
  reducers: {
    chooseDifficulty: (
      state,
      action: PayloadAction<
        "easy" | "medium" | "hard" | "expert" | "custom" | ""
      >
    ) => {
      state.difficulty = action.payload;
    },
  },
});

// Correct the export here:
export const { chooseDifficulty } = difficultyChoosing.actions;
export default difficultyChoosing.reducer;
