import { configureStore } from "@reduxjs/toolkit";
import pickingNumberReducer from "./pickedNumber";
import chooseDificulty from "./difficultyGame";
import mistakesNumbers from "./mistakesNumber";
import sudokuScore from "./score";

const store = configureStore({
  reducer: {
    pickingNumber: pickingNumberReducer,
    chosingDifficulty: chooseDificulty,
    mistakesNumber: mistakesNumbers,
    score: sudokuScore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
