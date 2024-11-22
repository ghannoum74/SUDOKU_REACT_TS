import { useState } from "react";

import DifficultuMenu from "./DifficultuMenu";
import LeaderBoard from "./LeaderBoard";

const SudokuInputs = () => {
  const [newGame, setNewGame] = useState(false);
  return (
    <div className="sudoku-inputs-container">
      <div className="number-container">
        <LeaderBoard />
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
