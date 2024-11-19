import GameNavbar from "./components/GameNavbar";
import SudokuInputs from "./components/SudokuInputs";
import SudokuSetting from "./components/SudokuSetting";
import SudokuShape from "./components/SudokuShape";
import "./css/App.css";
import GameOver from "./components/GameOver";
import { useSelector } from "react-redux";
import { RootState } from "./states/store";

function App() {
  // const [gameOver, setGameOver] = useState<boolean>(false);
  const isGameOver = useSelector((state: RootState) => state.timer.isGameOver);
  return (
    <div className="main-container">
      {isGameOver && <GameOver />}
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
