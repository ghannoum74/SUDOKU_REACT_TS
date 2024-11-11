import { useState } from "react";

const SudokuShape = () => {
  const rows = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9"];
  const column = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"];
  const [focused, setFocused] = useState<string>("");
  const cells: object[] = [];
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < column.length; j++) {
      cells.push({
        value: undefined,
        focused: false,
        id: `${rows[i]}c${j + 1}`,
        row: i + 1,
        column: j + 1,
      });
    }
  }

  const focusCells = (e: React.ChangeEvent) => {
    setFocused(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };

  return (
    <div className="Sudoku-shape-container">
      <table className="table-shape">
        <tbody>
          {rows.map((val1, key) => (
            <tr
              key={key}
              id={val1}
              className={`row ${focused.includes(val1) ? "focused" : ""}`}
            >
              {column.map((val2, key) => (
                <td
                  key={key}
                  id={`${val1}c${key + 1}`}
                  className={`cells ${focused.includes(val2) ? "focused" : ""}`}
                >
                  <input
                    type="text"
                    className={`${
                      focused === `${val1}${val2}` ? "focused" : ""
                    } `}
                    id={`${val1}${val2}`}
                    // value={}
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
