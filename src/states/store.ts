import { configureStore } from "@reduxjs/toolkit";
import pickingNumberReducer from "./pickedNumber";
import chooseDificulty from "./difficultyGame";
import mistakesNumbers from "./mistakesNumber";

const store = configureStore({
  reducer: {
    pickingNumber: pickingNumberReducer,
    chosingDifficulty: chooseDificulty,
    mistakesNumber: mistakesNumbers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
