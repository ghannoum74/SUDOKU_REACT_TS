import { configureStore } from "@reduxjs/toolkit";
import pickingNumberReducer from "./pickedNumber";
import chooseDificulty from "./difficultyGame";

const store = configureStore({
  reducer: {
    pickingNumber: pickingNumberReducer,
    chosingDifficulty: chooseDificulty,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
