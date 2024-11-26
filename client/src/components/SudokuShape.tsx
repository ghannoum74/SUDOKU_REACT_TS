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
import {
  generateEmptyBoard,
  generatePuzzle,
  isValidPlacement,
  solveSudoku,
} from "../utils/backTrackingAlgo";
import { giveHint } from "../utils/hint";
import {
  addMistakeCells,
  removeMistakeCells,
} from "../utils/getAndRemoveMistakeNumber";
import { Cell } from "../types/cell";

const SudokuShape = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [focused, setFocused] = useState<string>();

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

  const solvedCustomBoard = useSelector(
    (state: RootState) => state.solveCustomBoard.isSolved
  );
  const hint = useSelector((state: RootState) => state.hint.hint);

  const focusCells = (e: React.MouseEvent<HTMLElement>) => {
    setFocused(e.currentTarget.dataset.matrix);
  };

  const handleMistakeNumber = (
    type: string,
    mistakeNumber: Set<string>,
    board: Cell[][],
    value: number,
    row: number,
    column: number
  ) => {
    const mistakes =
      type === "remove"
        ? removeMistakeCells(mistakeNumber, value, board, row, column)
        : addMistakeCells(mistakeNumber, value, board, row, column);

    setMistakeNumber(mistakes);
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
    const updatedBoard = JSON.parse(JSON.stringify(board));
    const row: number = Number(e.currentTarget.dataset.row) - 1;
    const column: number = Number(e.currentTarget.dataset.column) - 1;
    const id: string = e.currentTarget.id;

    // when i clear the number reset the mistakNumbers
    if (e.target.value === "") {
      handleMistakeNumber(
        "remove",
        mistakeNumber,
        // i can't add the e.target.value because it's null
        updatedBoard,
        updatedBoard[row][column].value,
        row,
        column
      );

      updatedBoard[row][column].value = null;
      setWrongValue(
        (prev) => new Set([...prev].filter((value) => value !== id))
      );
      setCorrectValue(
        (prev) => new Set([...prev].filter((value) => value !== id))
      );
    } else {
      updatedBoard[row][column].value = Number(e.currentTarget.value);
      if (difficulty !== "custom") {
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
          handleMistakeNumber(
            "add",
            mistakeNumber,
            updatedBoard,
            Number(e.currentTarget.value),
            row,
            column
          );
          // if the number is wrong increment the mistake number
          // but first check if this is the last chance for mistakes
          if (mistakesNumber === 2000) {
            dispatch(setGameOver(true));
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
      } else {
        if (
          !isValidPlacement(
            updatedBoard,
            row,
            column,
            Number(e.currentTarget.value)
          )
        ) {
          handleMistakeNumber(
            "add",
            mistakeNumber,
            updatedBoard,
            Number(e.currentTarget.value),
            row,
            column
          );

          setWrongValue((prev) => new Set([...prev, id]));
        }
        dispatch(setSolvedData(updatedBoard));
      }
    }
    setBoard(updatedBoard);
  };

  useEffect(() => {
    // reset the values to remove all the classes style
    setWrongValue(new Set());
    setCorrectValue(new Set());
    dispatch(resetMistakNumber());
    dispatch(resetScore());
    setMistakeNumber(new Set());
    // set the first cell focused by default
    setFocused("111");
    // so when the game over component appear and i click on new game the function in the game over which let the difficulty be "" fire
    // so i can re select the easy mode and regenerate a new puzzle
    if (difficulty !== "" && difficulty !== "custom") {
      const defaultBoard = generateEmptyBoard("default");

      // get the solved board

      solveSudoku(defaultBoard);
      const newBoard = generatePuzzle(difficulty, defaultBoard);
      setBoard(newBoard.emptyBoard);
      dispatch(setSolvedData(newBoard.board));
    }
    if (difficulty !== "" && difficulty === "custom") {
      const defaultBoard = generateEmptyBoard("custom");
      setBoard(defaultBoard);
      dispatch(setSolvedData(defaultBoard));
    }
  }, [difficulty, dispatch]);

  // this is for the hint feature
  useEffect(() => {
    if (board.length > 0) {
      setBoard(giveHint(board));
      dispatch(setScore(difficulty));
      dispatch(checkScore(difficulty));
    }
  }, [hint]);

  // this use effect is for the custom board solver
  useEffect(() => {
    if (solvedCustomBoard) {
      setBoard(solvedBoard);
      // dispatch(solveCustomBoard(false));
    }
  }, [solvedCustomBoard]);

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
                    }${mistakeNumber.has(cell.id) ? "mistakNumber" : ""}
                    ${cell.hinted ? "hinted" : ""}`}
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
