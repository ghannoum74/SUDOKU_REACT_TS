import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {
  incrementMistakeNumber,
  resetMistakNumber,
} from "../states/mistakesNumber";
import { checkScore, resetScore, setScore } from "../states/score";
import { setGameOver, setPause } from "../states/timer";
import { setSolvedData } from "../states/SolvedBoardData";
import { generatePuzzle } from "../utils/backTrackingAlgo";
import { giveHint } from "../utils/hint";
import { setBoard } from "../states/board";

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

const SudokuShape = () => {
  // const [board, setBoard] = useState<Cell[][]>([]);
  const [focused, setFocused] = useState<string>();

  // const [solvedBoard, setSolvedBoard] = useState<Cell[][]>([]);
  const [correctValue, setCorrectValue] = useState<Set<string>>(new Set());
  const [wrongValue, setWrongValue] = useState<Set<string>>(new Set());
  const [mistakeNumber, setMistakeNumber] = useState<Set<string>>(new Set());
  const dispatch = useDispatch();

  const difficulty = useSelector(
    (state: RootState) => state.chosingDifficulty.difficulty
  );

  const isPaused = useSelector((state: RootState) => state.timer.isPaused);

  const mistakesNumber = useSelector(
    (state: RootState) => state.mistakesNumber.mistakesNb
  );
  const solvedBoard = useSelector(
    (state: RootState) => state.setSolvedData.solvedBoardData
  );
  const board = useSelector((state: RootState) => state.setBoard.board);

  const focusCells = (e: React.MouseEvent<HTMLElement>) => {
    setFocused(e.currentTarget.dataset.matrix);
  };

  // return the number which caused the input number to be incorrect
  const getTheMistakeCells = (
    value: number,
    board: Cell[][],
    row: number,
    column: number
  ) => {
    // reset the mistake number
    setMistakeNumber(new Set());

    // check the row

    for (let i = 0; i < 9; i++) {
      if (board[i][column].value === value) {
        setMistakeNumber((prev) => new Set([...prev, board[i][column].id]));
      }
    }
    // check the column

    for (let i = 0; i < 9; i++) {
      if (board[row][i].value === value) {
        setMistakeNumber((prev) => new Set([...prev, board[row][i].id]));
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    // searching in the current block

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // so here the startRow is rathe 0, 3, 6 so i add i which is 0 or 1 or 2 to seach through the block (0,1,2 --- 3, 4, 5 --- 6, 7, 8)
        if (board[startRow + i][startCol + j].value === value)
          setMistakeNumber(
            (prev) => new Set([...prev, board[startRow + i][startCol + j].id])
          );
      }
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

    setMistakeNumber(new Set());
    // when i clear the number reset the mistakNumbers
    if (e.target.value === "") {
      updatedBoard[row][column].value = null;
      setWrongValue(new Set());
    } else {
      updatedBoard[row][column].value = Number(e.currentTarget.value);

      // case if number is true
      if (solvedBoard[row][column].value === Number(e.currentTarget.value)) {
        // remove the number from the wrong section
        if (wrongValue.has(id)) {
          setWrongValue(
            (prev) => new Set([...prev].filter((value) => value !== id))
          );
        }
        // set the number to be correct
        setCorrectValue((prev) => new Set([...prev, id]));

        // this is to calculate the score
        // it check firstly if this cell is already calculated so to avoid when user enter true value many time for the same cell the increment for score
        if (e.currentTarget.dataset.calculate === "false") {
          dispatch(setScore(difficulty));

          // only if i enter a true number
          dispatch(checkScore(difficulty));
        }
        // if not calculated so i set calculate to true for this cell
        e.currentTarget.dataset.calculate = "true";
      } else {
        getTheMistakeCells(
          Number(e.currentTarget.value),
          updatedBoard,
          row,
          column
        );
        // if the number is wrong increment the mistake number
        // but first check if this is the last chance for mistakes
        if (mistakesNumber === 2) {
          dispatch(setGameOver(true));
          // reset the mistale number class list
          setMistakeNumber(new Set());
          // to remove the focus on the last cell focused
          e.currentTarget.blur();
          // updatedBoard[row][column].value = solvedBoard[row][column].value;
        }
        dispatch(incrementMistakeNumber());

        if (correctValue.has(id)) {
          setCorrectValue(
            (prev) => new Set([...prev].filter((value) => value !== id))
          );
        }
        setWrongValue((prev) => new Set([...prev, id]));
      }
    }
    dispatch(setBoard(updatedBoard));
  };

  useEffect(() => {
    // so when the game over component appear and i click on new game the function in the game over which let the difficulty be "" fire
    // so i can re select the easy mode and regenerate a new puzzle
    if (difficulty !== "") {
      const newBoard = generatePuzzle(difficulty);
      dispatch(setBoard(newBoard.emptyBoard));
      console.log(board);
      // setSolvedBoard(newBoard.board);
      dispatch(setSolvedData(newBoard.board));
      // reset the values to remove all the classes style
      setWrongValue(new Set());
      setCorrectValue(new Set());
      dispatch(resetMistakNumber());
      dispatch(resetScore());
      setMistakeNumber(new Set());
      // set the first cell focused by default
      setFocused("111");
    }
  }, [difficulty, dispatch]);

  // useEffect(() => {
  //   if (board.length > 0) {
  //     console.log(giveHint(board));
  //   }
  // }, [board]);

  return (
    <div className={`Sudoku-shape-container ${isPaused ? "paused" : ""}`}>
      {isPaused ? (
        <>
          <div
            className="pause-icon-container"
            onClick={() => dispatch(setPause())}
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
                    }${wrongValue.has(cell.id) ? "wrongValue" : ""} ${
                      isPaused ? "paused" : ""
                    }${mistakeNumber.has(cell.id) ? "mistakNumber" : ""}`}
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
                    data-calculate={cell.calculate}
                    autoComplete="off"
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
