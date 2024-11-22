import { getShuffledNumbers, isValidPlacement } from "./backTrackingAlgo";

interface Cell {
  value: number | null;
  calculate: boolean;
  id: string;
  row: number;
  column: number;
  block: number;
  matrix: string;
  unchangebale: boolean;
}

export const giveHint = (board: Cell[][]): Cell[][] => {
  const tempBoard = JSON.parse(JSON.stringify(board));
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (tempBoard[row][col].value === null) {
        const shuffledNumbers = getShuffledNumbers();
        for (const num of shuffledNumbers) {
          if (isValidPlacement(tempBoard, row, col, num)) {
            tempBoard[row][col].value = num;
            return tempBoard;
          }
        }
      }
    }
  }
  return board;
};
