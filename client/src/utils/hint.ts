import { Cell } from "../types/cell";
import { getShuffledNumbers, isValidPlacement } from "./backTrackingAlgo";

export const giveHint = (board: Cell[][]): Cell[][] => {
  const tempBoard = JSON.parse(JSON.stringify(board));

  // loop using shuffled array number for the hint be not in order
  const shuffleRow = getShuffledNumbers();
  const shuffleColumn = getShuffledNumbers();
  for (const row of shuffleRow) {
    for (const col of shuffleColumn) {
      if (tempBoard[row - 1][col - 1].value === null) {
        for (let i = 1; i <= 9; i++) {
          if (isValidPlacement(tempBoard, row - 1, col - 1, i)) {
            tempBoard[row - 1][col - 1].value = i;
            // set the hinted cell unchangebale to avoid erase it
            tempBoard[row - 1][col - 1].unchangebale = true;
            tempBoard[row - 1][col - 1].hinted = true;
            return tempBoard;
          }
        }
      }
    }
  }

  return tempBoard;
};
