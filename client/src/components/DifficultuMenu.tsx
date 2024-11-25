import React from "react";
import { chooseDifficulty } from "../states/difficultyGame";
import { useDispatch } from "react-redux";

interface diffState {
  newGame: boolean;
}

const DifficultuMenu: React.FC<diffState> = ({ newGame }) => {
  type Level = "easy" | "medium" | "hard" | "expert" | "custom";
  const dispatch = useDispatch();

  const handleLevel = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(chooseDifficulty(e.currentTarget.id as Level));
  };

  return (
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
        <div className="level-container" id="custom" onClick={handleLevel}>
          <li>
            <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
          </li>
          <li style={{ width: "100%" }}>Create Your Own Board</li>
        </div>
      </ul>
    </div>
  );
};

export default DifficultuMenu;
