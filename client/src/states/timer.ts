import { createSlice } from "@reduxjs/toolkit";

type timerState = {
  seconds: number;
  minutes: number;
  hours: number;
  isPaused: boolean;
  isGameOver: boolean;
};

const initialState: timerState = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  isPaused: false,
  isGameOver: false,
};

export const setTimer = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.seconds += 1;
      if (state.hours === 24) {
        state.hours = 0;
        state.minutes = 0;
        state.seconds = 0;
      }
      if (state.seconds === 60) {
        state.seconds = 0;
        state.minutes += 1;
      }
      if (state.minutes === 60) {
        state.minutes = 0;
        state.hours += 1;
      }
    },

    // this is to stop the timer
    setPause: (state) => {
      state.isPaused = !state.isPaused;
    },

    pause: (state) => {
      state.isPaused = true;
    },
    setGameOver: (state, action) => {
      state.isGameOver = action.payload;
    },
    resetTimer: (state) => {
      state.hours = 0;
      state.minutes = 0;
      state.seconds = 0;
    },
  },
});

export const getTimer = (state: { timer: timerState }) => {
  const { hours, minutes, seconds } = state.timer;
  return (
    `${hours <= 9 ? `0${hours}` : hours}:` +
    `${minutes <= 9 ? `0${minutes}` : minutes}:` +
    `${seconds <= 9 ? `0${seconds}` : seconds}`
  );
};

// Correct the export here:
export const { startTimer, setPause, setGameOver, resetTimer, pause } =
  setTimer.actions;
export default setTimer.reducer;
