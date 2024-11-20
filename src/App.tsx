import GameNavbar from "./components/GameNavbar";
import SudokuInputs from "./components/SudokuInputs";
import SudokuSetting from "./components/SudokuSetting";
import SudokuShape from "./components/SudokuShape";
import "./css/App.css";
import GameOver from "./components/GameOver";
import { useSelector } from "react-redux";
import { RootState } from "./states/store";
import Congrats from "./components/Congrats";

function App() {
  // const [gameOver, setGameOver] = useState<boolean>(false);
  const isGameOver = useSelector((state: RootState) => state.timer.isGameOver);
  // const isFinished = useSelector(
  //   (state: RootState) => state.setSudokuFinished.isFinished);
  const isGameSolved = useSelector((state: RootState) => state.score.isSolved);
  return (
    <div className="main-container">
      {isGameOver && <GameOver />}
      {isGameSolved ? (
        <Congrats />
      ) : (
        <>
          <GameNavbar />
          <div className="game-container">
            <SudokuShape />
            <div className="setting-container">
              <SudokuSetting />
              <SudokuInputs />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
