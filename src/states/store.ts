import { configureStore } from "@reduxjs/toolkit";
import pickingNumberReducer from "./pickedNumber";

const store = configureStore({
  reducer: {
    pickingNumber: pickingNumberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
