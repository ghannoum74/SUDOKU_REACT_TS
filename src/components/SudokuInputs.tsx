import { useEffect, useState } from "react";

import DifficultuMenu from "./DifficultuMenu";

const SudokuInputs = () => {
  const [newGame, setNewGame] = useState(false);
  useEffect(() => {}, []);
  return (
    <div className="sudoku-inputs-container">
      <div className="number-container">
        <div className="leader-board">{localStorage.getItem("username")}</div>
        <div
          className="new-game"
          style={{ userSelect: "none" }}
          onClick={() => setNewGame((prev) => !prev)}
        >
          New Game
        </div>
      </div>
      {newGame && <DifficultuMenu newGame={newGame} />}
    </div>
  );
};

export default SudokuInputs;
