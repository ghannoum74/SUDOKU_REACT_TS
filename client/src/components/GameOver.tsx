import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { decrementMistakeNumber } from "../states/mistakesNumber";
import { chooseDifficulty } from "../states/difficultyGame";
import { setGameOver } from "../states/timer";

const GameOver = () => {
  type Level = "easy" | "medium" | "hard" | "expert" | "custom";
  const [togglePupop, setTogglePupop] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleSecondChancge = () => {
    dispatch(setGameOver(false));
    dispatch(decrementMistakeNumber());
  };

  const handleLevel = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(chooseDifficulty(e.currentTarget.id as Level));
    dispatch(setGameOver(false));
  };
  const handleNewGame = () => {
    setTogglePupop(true);
    dispatch(chooseDifficulty(""));
  };

  return (
    <>
      <div className="game-over">
        <div className="pupop">
          {togglePupop ? (
            <div className={`pupop-new-game-menu appear`}>
              <div className="pupop-head">Select Game Mode</div>
              <div className="pupop-small">
                Current game progress will be lost
              </div>
              <div className="pupop-mode-btn">Classic</div>
              <ul className="pupop-level">
                <div
                  className="pupop-level-container"
                  id="easy"
                  onClick={handleLevel}
                >
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
                  </li>
                  <li>Easy</li>
                </div>
                <div
                  className="pupop-level-container"
                  id="medium"
                  onClick={handleLevel}
                >
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
                  </li>
                  <li>Medium</li>
                </div>
                <div
                  className="pupop-level-container"
                  id="hard"
                  onClick={handleLevel}
                >
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
                  </li>
                  <li>Hard</li>
                </div>
                <div
                  className="pupop-level-container"
                  id="expert"
                  onClick={handleLevel}
                >
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
                  </li>
                  <li>Expert</li>
                </div>
                <div
                  className="pupop-level-container"
                  id="custom"
                  onClick={handleLevel}
                >
                  <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/4295/4295600.png" />
                  </li>
                  <li style={{ width: "100%", textAlign: "start" }}>
                    Create Your Own
                  </li>
                </div>
              </ul>
            </div>
          ) : (
            <>
              <div className="text">
                <h2>Game Over</h2>
                <div>You have made 3 mistakes and lost this game</div>
              </div>
              <div className="btn">
                <button
                  className="second-chance-btn"
                  onClick={handleSecondChancge}
                >
                  Second Chance
                </button>
                <button className="new-game-btn" onClick={handleNewGame}>
                  New Game
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GameOver;
