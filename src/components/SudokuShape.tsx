import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
// import { setNumber } from "../states/pickedNumber";

interface Cell {
  value: number | null;
  focused: boolean;
  id: string;
  row: number;
  column: number;
  block: number;
  matrix: string;
}

const generateEmptyBoard = (): Cell[][] => {
  const board: Cell[][] = [];
  for (let r = 0; r < 9; r++) {
    const row: Cell[] = [];
    for (let cell = 0; cell < 9; cell++) {
      row.push({
        value: null,
        focused: false,
        id: `r${r}c${cell + 1}`,
        row: r + 1,
        column: cell + 1,
        block: Math.floor(r / 3) * 3 + Math.floor(cell / 3) + 1,
        matrix: `${r + 1}${cell + 1}${
          Math.floor(r / 3) * 3 + Math.floor(cell / 3) + 1
        }`,
      });
    }
    board.push(row);
  }
  return board;
};

const isValidPlacement = (
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

// implement the backtracking algo to solve the sudoku board
const solveSudoku = (board: Cell[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) {
        for (let num = 1; num <= 9; num++) {
          const value = Math.floor(Math.random() * 9) + 1;
          if (isValidPlacement(board, row, col, value)) {
            board[row][col].value = value;
            if (solveSudoku(board)) return true;
            board[row][col].value = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const generateSudokuBoard = (): Cell[][] => {
  const board = generateEmptyBoard();
  solveSudoku(board);
  return board;
};

const SudokuShape = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [focused, setFocused] = useState<string>();

  const selectedNumber = useSelector(
    (state: RootState) => state.pickingNumber.numberSelected
  );

  const focusCells = (e: React.MouseEvent<HTMLElement>) => {
    setFocused(e.currentTarget.dataset.matrix);

    if (selectedNumber) {
      const target = e.currentTarget as HTMLInputElement;
      target.value = selectedNumber.toString();
    }
  };

  const handleInputType = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.charCodeAt(0) < 49 ||
      e.target.value.charCodeAt(0) > 57
    ) {
      e.target.value = "";
    }
  };

  useEffect(() => {
    const newBoard = generateSudokuBoard();
    setBoard(newBoard);
  }, []);

  return (
    <div className="Sudoku-shape-container">
      <table className="table-shape">
        <tbody>
          {board.map((row, key) => (
            <tr key={key} id={`${key}`}>
              {row.map((cell, key) => (
                <td key={key} id={cell.id}>
                  <input
                    type="text"
                    className={`${
                      focused?.charAt(focused.length - 1) ===
                        cell.matrix.charAt(cell.matrix.length - 1) ||
                      focused?.charAt(0) === cell.matrix.charAt(0) ||
                      focused?.charAt(1) === cell.matrix.charAt(1)
                        ? "focused"
                        : ""
                    }${focused === cell.matrix ? " current" : ""} `}
                    id={cell.id}
                    value={cell.value ?? ""}
                    data-matrix={`${cell.row}${cell.column}${cell.block}`}
                    data-row={cell.row}
                    data-column={cell.column}
                    data-block={cell.block}
                    maxLength={1}
                    onClick={focusCells}
                    onInput={handleInputType}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SudokuShape;
