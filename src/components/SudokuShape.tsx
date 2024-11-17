import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { setIsPause } from "../states/pauseGame";
// import { setNumber } from "../states/pickedNumber";

interface Cell {
  value: number | null;
  focused: boolean;
  id: string;
  row: number;
  column: number;
  block: number;
  matrix: string;
  unchangebale: boolean;
}

type PuzzleResult = {
  emptyBoard: Cell[][];
  board: Cell[][];
};

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
        unchangebale: true,
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

// this is to get rondom array contain number from 1 to 9 but with shuffling index
const getShuffledNumbers = (): number[] => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
};

// implement the backtracking algo to solve the sudoku board
const solveSudoku = (board: Cell[][]): boolean => {
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

const generatePuzzle = (
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

const SudokuShape = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [focused, setFocused] = useState<string>();
  const [solvedBoard, setSolvedBoard] = useState<Cell[][]>([]);
  const [correctValue, setCorrectValue] = useState<Set<string>>(new Set());
  const [wrongValue, setWrongValue] = useState<Set<string>>(new Set());
  const dispatch = useDispatch();

  const selectedNumber = useSelector(
    (state: RootState) => state.pickingNumber.numberSelected
  );
  const difficulty = useSelector(
    (state: RootState) => state.chosingDifficulty.difficulty
  );

  const isPaused = useSelector((state: RootState) => state.isPaused.isPaused);

  const focusCells = (e: React.MouseEvent<HTMLElement>) => {
    setFocused(e.currentTarget.dataset.matrix);

    if (selectedNumber) {
      const target = e.currentTarget as HTMLInputElement;
      target.value = selectedNumber.toString();
    }
  };

  const handleInputType = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      // so it allows the clear button
      (e.target.value !== "" && e.target.value.charCodeAt(0) < 49) ||
      e.target.value.charCodeAt(0) > 57
    ) {
      e.target.value = "";
      return;
    }
    const updatedBoard = [...board];
    const row: number = Number(e.currentTarget.dataset.row) - 1;
    const column: number = Number(e.currentTarget.dataset.column) - 1;
    const id: string = e.currentTarget.id;

    if (e.target.value === "") {
      updatedBoard[row][column].value = null;
    } else {
      updatedBoard[row][column].value = Number(e.currentTarget.value);

      if (solvedBoard[row][column].value === Number(e.currentTarget.value)) {
        if (wrongValue.has(id)) {
          setWrongValue(
            (prev) => new Set([...prev].filter((value) => value !== id))
          );
        }
        setCorrectValue((prev) => new Set([...prev, id]));
      } else {
        if (correctValue.has(id)) {
          setCorrectValue(
            (prev) => new Set([...prev].filter((value) => value !== id))
          );
        }
        setWrongValue((prev) => new Set([...prev, id]));
      }
    }
    setBoard(updatedBoard);
  };

  useEffect(() => {
    const newBoard = generatePuzzle(difficulty);
    setBoard(newBoard.emptyBoard);
    // console.log(newBoard.emptyBoard);
    setSolvedBoard(newBoard.board);

    // reset the values to remove all the classes style
    setWrongValue(new Set());
    setCorrectValue(new Set());

    // set the first cell focused by default
    setFocused("111");
  }, [difficulty]);

  return (
    <div className={`Sudoku-shape-container ${isPaused ? "paused" : ""}`}>
      {isPaused ? (
        <>
          <div
            className="pause-icon-container"
            onClick={() => dispatch(setIsPause())}
          >
            <FontAwesomeIcon
              icon={faPlay}
              size="xl"
              style={{ color: "#ffffff", width: "24px" }}
            />
          </div>
        </>
      ) : null}
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
                    }${focused === cell.matrix ? " current" : ""} ${
                      correctValue.has(cell.id) ? "correctValue" : ""
                    }${wrongValue.has(cell.id) ? "wrongValue" : ""}${
                      isPaused ? "paused" : ""
                    }`}
                    id={cell.id}
                    value={cell.value ?? ""}
                    data-matrix={`${cell.row}${cell.column}${cell.block}`}
                    data-row={cell.row}
                    data-column={cell.column}
                    data-block={cell.block}
                    maxLength={1}
                    onClick={focusCells}
                    onChange={handleInputType}
                    readOnly={cell.unchangebale ? true : false}
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
