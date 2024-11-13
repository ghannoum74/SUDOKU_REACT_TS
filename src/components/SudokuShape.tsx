import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";

const SudokuShape = () => {
  // const rows = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9"];
  // const column = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"];
  const [focused, setFocused] = useState<string>();
  // const [focused, setFocusedOther] = useState<string>();
  const [cellValue, setCellValue] = useState<number>();
  const cells: object[] = [];
  const uiData: object[] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells.push({
        value: undefined,
        focused: false,
        id: `r${i}c${j + 1}`,
        row: i + 1,
        column: j + 1,
        block: Math.floor(i / 3) * 3 + Math.floor(j / 3) + 1,
        matrix: `${i + 1}${j + 1}${
          Math.floor(i / 3) * 3 + Math.floor(j / 3) + 1
        }`,
      });
    }
  }

  for (let i = 0; i < 81; i += 9) {
    uiData.push(cells.slice(i, i + 9));
  }

  const selectedNumber = useSelector(
    (state: RootState) => state.pickingNumber.numberSelected
  );

  const focusCells = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e.currentTarget.id);
    // console.log(e.currentTarget.dataset.matrix);
    setFocused(e.currentTarget.dataset.matrix);
    if (selectedNumber) {
      setCellValue(selectedNumber);
    }
  };

  // const handleHoverEffect = (e: React.MouseEvent<HTMLElement>) => {};

  useEffect(() => {
    console.log(typeof focused);

    // console.log(cellValue[focused]);
    // console.log(cells);
  }, [focused]);

  return (
    <div className="Sudoku-shape-container">
      <table className="table-shape">
        <tbody>
          {uiData.map((val1, key) => (
            <tr key={key} id={`${key}`}>
              {val1.map((val2, key) => (
                <td key={key} id={val2.id}>
                  <input
                    type="text"
                    className={`${
                      focused?.charAt(focused.length - 1) ===
                        val2.matrix.charAt(val2.matrix.length - 1) ||
                      focused?.charAt(0) === val2.matrix.charAt(0) ||
                      focused?.charAt(1) === val2.matrix.charAt(1)
                        ? "focused"
                        : ""
                    }${focused === val2.matrix ? " current" : ""} `}
                    id={val2.id}
                    value={focused === val2.id ? cellValue : undefined}
                    data-matrix={`${val2.row}${val2.column}${val2.block}`}
                    data-row={val2.row}
                    data-column={val2.column}
                    data-block={val2.block}
                    maxLength={1}
                    onClick={focusCells}
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
