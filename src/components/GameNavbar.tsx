import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseDifficulty } from "../states/difficultyGame";
import { RootState } from "../states/store";

const GameNavbar = () => {
  type Level = "easy" | "medium" | "hard" | "expert" | "";
  const [clickable, setClickable] = useState<string>("Easy");
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const difficulty: string[] = ["Easy", "Medium", "Hard", "Expert"];
  const dispatch = useDispatch();

  const mistakesNb = useSelector(
    (state: RootState) => state.mistakesNumber.mistakesNb
  );

  const score = useSelector((state: RootState) => state.score.score);

  useEffect(() => {
    if (paused) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    if (hours === 24) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setPaused(true);
    }
    if (seconds === 60) {
      setMinutes((min) => min + 1);
      setSeconds(0);
    }
    if (minutes === 60) {
      setHours((hour) => hour + 1);
      setMinutes(0);
    }

    return () => clearInterval(interval);
  }, [seconds, paused, hours, minutes]);

  const handleLevel = (e: React.MouseEvent<HTMLElement>) => {
    setClickable(String(e.currentTarget.id));
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
            className={`hovered-data ${val === clickable ? "clickable" : ""}`}
            onClick={handleLevel}
            data-val={val}
          >
            {val}
          </li>
        ))}
      </ul>
      <ul className="game-data-wrapper">
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
                icon={paused ? faCirclePlay : faCirclePause}
                size="xl"
                style={{
                  color: "rgb(203 212 225)",
                  cursor: "pointer",
                  marginLeft: "-0.3rem",
                }}
                onClick={() => setPaused((prev) => (prev ? false : true))}
              />
            </span>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default GameNavbar;
