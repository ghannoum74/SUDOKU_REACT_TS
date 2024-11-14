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
    const newBoard = generateEmptyBoard();
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
