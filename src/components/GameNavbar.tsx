import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseDifficulty } from "../states/difficultyGame";
import { RootState } from "../states/store";
import { resetTimer, setPause, startTimer } from "../states/timer";

const GameNavbar = () => {
  type Level = "easy" | "medium" | "hard" | "expert";

  // to avoid re create the same array for each time
  const difficulty = ["Easy", "Medium", "Hard", "Expert"];
  const dispatch = useDispatch();
  const seconds = useSelector((state: RootState) => state.timer.seconds);
  const minutes = useSelector((state: RootState) => state.timer.minutes);
  const hours = useSelector((state: RootState) => state.timer.hours);
  const isGameOver = useSelector((state: RootState) => state.timer.isGameOver);

  const mistakesNb = useSelector(
    (state: RootState) => state.mistakesNumber.mistakesNb
  );
  const difficultyState = useSelector(
    (state: RootState) => state.chosingDifficulty.difficulty
  );

  const score = useSelector((state: RootState) => state.score.score);
  const isPaused = useSelector((state: RootState) => state.timer.isPaused);
  const isSolved = useSelector((state: RootState) => state.score.isSolved);

  useEffect(() => {
    // to stop the timer
    if (isPaused || isGameOver) {
      return;
    }
    const interval = setInterval(() => {
      dispatch(startTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, isPaused, isGameOver]);

  useEffect(() => {
    // Reset the timer when the difficulty changes
    dispatch(resetTimer());
  }, [difficultyState, dispatch]);

  const handleLevel = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(chooseDifficulty(e.currentTarget.id.toLowerCase() as Level));
  };

  return (
    <div className="game-navbar-container">
      <ul className="dificulty-wrapper">
        <li>Dificulty:</li>
        {difficulty.map((val, key) => (
          <li
            key={key}
            id={val}
            className={`hovered-data ${
              val.toLowerCase() === difficultyState ? "clickable" : ""
            }`}
            onClick={handleLevel}
            data-val={val}
          >
            {val}
          </li>
        ))}
      </ul>
      <ul
        className="game-data-wrapper"
        style={{ display: `${isSolved ? "none" : "block"}` }}
      >
        <ul className="data-game-container">
          <li>
            <span className="title">Mistakes:</span>
            <span className="value">{mistakesNb}/3</span>
          </li>
          <li>
            <span className="title">Score:</span>
            <span className="value">{score}</span>
          </li>
          <li className="timer">
            <span>
              {hours <= 9 ? `0${hours}` : hours}:
              {minutes <= 9 ? `0${minutes}` : minutes}:
              {seconds <= 9 ? `0${seconds}` : seconds}
            </span>
          </li>
          <li>
            <span>
              <FontAwesomeIcon
                className="pause-icon"
                icon={isPaused ? faCirclePlay : faCirclePause}
                size="xl"
                style={{
                  color: "rgb(203 212 225)",
                  cursor: "pointer",
                  marginLeft: "-0.3rem",
                }}
                onClick={() => dispatch(setPause())}
              />
            </span>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default GameNavbar;
