import { useSelector } from "react-redux";
import { RootState } from "../states/store";

const Congrats = () => {
  const score = useSelector((state: RootState) => state.score.score);
  const level = useSelector((state: RootState) => state.score.level);
  const seconds = useSelector((state: RootState) => state.timer.seconds);
  const minutes = useSelector((state: RootState) => state.timer.minutes);
  const hours = useSelector((state: RootState) => state.timer.hours);
  const fullSudokuShape = useSelector(
    (state: RootState) => state.setSolvedData.solvedBoardData
  );

  console.log(fullSudokuShape);
  return (
    <div className="congrat-container">
      <div className="left-side">
        <img src="https://sudoku.com/img/rays.png" />
        <h1>Excellent!</h1>
        <table className="table-shape">
          <tbody>
            {fullSudokuShape.map((row, key) => (
              <tr key={key} id={`${key}`}>
                {row.map((cell, key) => (
                  <td key={key} id={cell.id}>
                    <div id={cell.id}>{cell.value}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="right-side">
        <div className="position">
          <div className="">Tournament Positions</div>
          <button>See All</button>
        </div>
        <div className="name-id">
          <div>Name</div>
          <div>Name</div>
        </div>
        <div className="score">
          <div>
            <div className="">Score</div>
            <div>{score}</div>
          </div>
          <div className="difficulty">
            <div className="">Difficulty</div>
            <div>{level}</div>
          </div>
          <div className="time">
            <div className="">Time</div>
            <div>
              {hours <= 9 ? `0${hours}` : hours}:
              {minutes <= 9 ? `0${minutes}` : minutes}:
              {seconds <= 9 ? `0${seconds}` : seconds}
            </div>
          </div>
        </div>
        <button className="new-game">New Game</button>
      </div>
    </div>
  );
};

export default Congrats;
