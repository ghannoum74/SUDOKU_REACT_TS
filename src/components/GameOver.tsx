import React from "react";
import { useDispatch } from "react-redux";
import { decrementMistakeNumber } from "../states/mistakesNumber";

interface SudokuShapeProps {
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameOver: React.FC<SudokuShapeProps> = ({ setGameOver }) => {
  const dispatch = useDispatch();
  const handleSecondChancge = () => {
    setGameOver(false);
    dispatch(decrementMistakeNumber());
  };
  return (
    <div className="game-over">
      <div className="pupop">
        <div className="text">
          <h2>Game Over</h2>
          <div>You have made 3 mistakes and lost this game</div>
        </div>
        <div className="btn">
          <button className="second-chance-btn" onClick={handleSecondChancge}>
            Second Chance
          </button>
          <button className="new-game-btn">New Game</button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
