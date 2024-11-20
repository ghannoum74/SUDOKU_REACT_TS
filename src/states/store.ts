import { configureStore } from "@reduxjs/toolkit";
import chooseDificulty from "./difficultyGame";
import mistakesNumbers from "./mistakesNumber";
import sudokuScore from "./score";
import setTimer from "./timer";
import setSolvedData from "./SolvedBoardData";

const store = configureStore({
  reducer: {
    chosingDifficulty: chooseDificulty,
    mistakesNumber: mistakesNumbers,
    score: sudokuScore,
    timer: setTimer,
    setSolvedData: setSolvedData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
