import GameNavbar from "./components/GameNavbar";
import SudokuInputs from "./components/SudokuInputs";
import SudokuSetting from "./components/SudokuSetting";
import SudokuShape from "./components/SudokuShape";
import "./css/App.css";

function App() {
  return (
    <div className="main-container">
      <GameNavbar />
      <div className="game-container">
        <SudokuShape />
        <div className="setting-container">
          <SudokuSetting />
          <SudokuInputs />
        </div>
      </div>
    </div>
  );
}

export default App;
