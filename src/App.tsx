import GameNavbar from "./components/GameNavbar";
import SudokuInputs from "./components/SudokuInputs";
import SudokuSetting from "./components/SudokuSetting";
import SudokuShape from "./components/SudokuShape";
import "./css/App.css";
import { useState } from "react";
import GameOver from "./components/GameOver";

function App() {
  const [gameOver, setGameOver] = useState<boolean>(false);

  return (
    <div className="main-container">
      {gameOver && <GameOver setGameOver={setGameOver} />}
      <GameNavbar gameOver={gameOver} />

      <div className="game-container">
        <SudokuShape setGameOver={setGameOver} />
        <div className="setting-container">
          <SudokuSetting />
          <SudokuInputs />
        </div>
      </div>
    </div>
  );
}

export default App;
