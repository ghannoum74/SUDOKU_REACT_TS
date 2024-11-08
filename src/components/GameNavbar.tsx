import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const GameNavbar = () => {
  const [mistakesNb, setMistakeNb] = useState(0);
  const [score, setScore] = useState(0);
  const [clickable, setClickable] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [paused, setPaused] = useState(false);
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
    <div className="game-info-container">
      <ul className="dificulty-wrapper">
        <li>Dificulty:</li>
        {difficulty.map((val, key) => (
          <li
            key={key}
            className={`hovered-data ${val === clickable ? "clickable" : ""}`}
            onClick={(e) => setClickable(e.target.dataset.val)}
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
                icon={faCirclePause}
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
