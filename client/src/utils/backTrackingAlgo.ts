interface Cell {
  value: number | null;
  calculate: boolean;
  id: string;
  row: number;
  column: number;
  block: number;
  matrix: string;
  unchangebale: boolean;
  hinted: boolean;
}

type PuzzleResult = {
  emptyBoard: Cell[][];
  board: Cell[][];
};

export const generateEmptyBoard = (): Cell[][] => {
  const board: Cell[][] = [];
  for (let r = 0; r < 9; r++) {
    const row: Cell[] = [];
    for (let cell = 0; cell < 9; cell++) {
      row.push({
        value: null,
        calculate: false,
        id: `r${r}c${cell}`,
        row: r + 1,
        column: cell + 1,
        block: Math.floor(r / 3) * 3 + Math.floor(cell / 3) + 1,
        matrix: `${r + 1}${cell + 1}${
          Math.floor(r / 3) * 3 + Math.floor(cell / 3) + 1
        }`,
        unchangebale: true,
        hinted: false,
      });
    }
    board.push(row);
  }
  return board;
};

export const isValidPlacement = (
  board: Cell[][],
  row: number,
  col: number,
  num: number
): boolean => {
  // searching through the row or column
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === num || board[i][col].value === num)
      return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  // searching in the current block

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // so here the startRow is rathe 0, 3, 6 so i add i which is 0 or 1 or 2 to seach through the block (0,1,2 --- 3, 4, 5 --- 6, 7, 8)
      if (board[startRow + i][startCol + j].value === num) return false;
    }
  }
  return true;
};

// this is to get rondom array contain number from 1 to 9 but with shuffling index
export const getShuffledNumbers = (): number[] => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
};

// implement the backtracking algo to solve the sudoku board
export const solveSudoku = (board: Cell[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Check if the cell is empty
      if (board[row][col].value === null) {
        const shuffledNumbers = getShuffledNumbers();
        for (const num of shuffledNumbers) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col].value = num;
            if (solveSudoku(board)) return true;
            board[row][col].value = null;
          }
        }
        // If no valid number is found, return false to backtrack
        return false;
      }
    }
  }
  return true;
};

export const generatePuzzle = (
  difficulty: "easy" | "medium" | "hard" | "expert" | ""
): PuzzleResult => {
  // get the solved board
  const board = generateEmptyBoard();

  solveSudoku(board);

  // working on clone for the actuall board
  // in this case i used the deep copy to avoid the actuall variable effect by changing for the variable copy
  const emptyBoard = JSON.parse(JSON.stringify(board));
  let cellsToRemove = 0;

  // et the difficulties
  switch (difficulty) {
    case "easy":
      cellsToRemove = 30;

      break;
    case "medium":
      cellsToRemove = 50;

      break;
    case "hard":
      cellsToRemove = 60;
      break;
    case "expert":
      cellsToRemove = 75;
      break;
    default: {
      cellsToRemove = 30;
      break;
    }
  }

  // remove number rondomely
  while (cellsToRemove > 0) {
    // select randomaly row and columns to remove cells from
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (emptyBoard[row][col].value !== null) {
      emptyBoard[row][col].value = null;

      // so the hidden cell can be changebale
      emptyBoard[row][col].unchangebale = false;
      cellsToRemove--;
    }
  }

  return { emptyBoard, board };
};
