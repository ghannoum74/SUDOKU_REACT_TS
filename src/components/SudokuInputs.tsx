import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNumber } from "../states/pickedNumber";
import { chooseDifficulty } from "../states/difficultyGame";

const SudokuInputs = () => {
  type Level = "easy" | "medium" | "hard" | "expert" | "";
  const [newGame, setNewGame] = useState(false);
  const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const dispatch = useDispatch();

  const pickedNumber = (e: React.MouseEvent<HTMLLIElement>) => {
    dispatch(setNumber(Number(e.currentTarget.dataset.val)));
  };

  const handleLevel = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(chooseDifficulty(e.currentTarget.id as Level));
  };

  return (
    <div className="sudoku-inputs-container">
      <ul className="number-container">
        {numbers.map((val, key) => (
          <li key={key} data-val={val} onClick={pickedNumber}>
            {val}
          </li>
        ))}
        <li
          className="new-game"
          style={{ userSelect: "none" }}
          onClick={() => setNewGame((prev) => !prev)}
        >
          New Game
        </li>
      </ul>
      {newGame && (
        <div className={`new-game-menu ${newGame ? "appear" : ""}`}>
          <div className="head">Select Game Mode</div>
          <div className="small">Current game progress will be lost</div>
          <div className="mode-btn">Classic</div>
          <ul className="level">
            <div className="level-container" id="easy" onClick={handleLevel}>
              <li>
                <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
              </li>
              <li>Easy</li>
            </div>
            <div className="level-container" id="medium" onClick={handleLevel}>
              <li>
                <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
              </li>
              <li>Medium</li>
            </div>
            <div className="level-container" id="hard" onClick={handleLevel}>
              <li>
                <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
              </li>
              <li>Hard</li>
            </div>
            <div className="level-container" id="expert" onClick={handleLevel}>
              <li>
                <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
              </li>
              <li>Expert</li>
            </div>
            {/* <div className="level-container" id="restart" onClick={handleLevel}>
              <li>
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  style={{ color: "#325aaf" }}
                  size="lg"
                />
              </li>
              <li>restart</li>
            </div> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SudokuInputs;
