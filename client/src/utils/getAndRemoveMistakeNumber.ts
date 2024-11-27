import { Cell } from "../types/cell";

export const addMistakeCells = (
  oldeMistakeNumber: Set<string>,
  value: number,
  board: Cell[][],
  row: number,
  column: number
): Set<string> => {
  const mistakeIds = new Set<string>(oldeMistakeNumber);

  // Check the column
  for (let i = 0; i < 9; i++) {
    if (board[i][column].value === value) {
      mistakeIds.add(board[i][column].id);
    }
  }

  // Check the row
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === value) {
      mistakeIds.add(board[row][i].id);
    }
  }

  // Check the 3x3 block
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(column / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j].value === value) {
        mistakeIds.add(board[startRow + i][startCol + j].id);
      }
    }
  }

  return mistakeIds;
};

export const removeMistakeCells = (
  oldeMistakeNumber: Set<string>,
  value: number,
  board: Cell[][],
  row: number,
  column: number
): Set<string> => {
  const mistakeIds = new Set<string>(oldeMistakeNumber);

  // Check the column
  for (let i = 0; i < 9; i++) {
    if (board[i][column].value === value) {
      console.log(value);
      mistakeIds.delete(board[i][column].id);
    }
  }

  // Check the row
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === value) {
      mistakeIds.delete(board[row][i].id);
    }
  }

  // Check the 3x3 block
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(column / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j].value === value) {
        mistakeIds.delete(board[startRow + i][startCol + j].id);
      }
    }
  }

  return mistakeIds;
};
