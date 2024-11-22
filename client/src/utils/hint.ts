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
  const row = Math.floor(Math.random() * 9);
  const column = Math.floor(Math.random() * 9);

  if (board[row][column].value === null) {
    const shuffledNumbers = getShuffledNumbers();
    for (const num of shuffledNumbers) {
      if (isValidPlacement(tempBoard, row, column, num)) {
        tempBoard[row][column].value = num;
        tempBoard[row][column].unchangebale = true;
        return tempBoard;
      }
    }
  }

  return giveHint(board);
};
