import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const GameInfo = () => {
  const [mistakesNb, setMistakeNb] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    if (seconds === 60) {
      setMinutes((min) => min + 1);
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [seconds, paused]);
  const difficulty: string[] = [
    "Easy",
    "Medium",
    "Hard",
    "Expert",
    "Master",
    "Extreme",
  ];

  return (
    <div className="game-info">
      <div className="game-info-container">
        <ul className="dificulty-wrapper">
          {difficulty.map((val, key) => (
            <li key={key}>{val}</li>
          ))}
        </ul>
        <ul className="game-data-wrapper">
          <ul className="data-game-container">
            <li>
              <div>Mistakes:</div>
              <div>{mistakesNb}\3</div>
            </li>
            <li>
              <div>Score:{score}</div>
              <div>
                {minutes <= 9 ? `0${minutes}` : minutes}:
                {seconds <= 9 ? `0${seconds}` : seconds}
              </div>
            </li>
            <li>
              <div></div>
            </li>
            <li>
              <div>
                <FontAwesomeIcon
                  icon={faCirclePause}
                  style={{ color: "#74a3b7" }}
                  onClick={() => setPaused((prev) => (prev ? false : true))}
                />
              </div>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default GameInfo;
