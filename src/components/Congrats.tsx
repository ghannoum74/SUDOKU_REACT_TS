const Congrats = () => {
  return (
    <div className="congrat-container">
      <div className="left-side">
        <h1>Excellent!</h1>
        <div className="solved-sudoku">solved sudoku</div>
      </div>
      <div className="right-side">
        <div className="position">
          <div className="">Tournament Positions</div>
          <button>See All</button>
        </div>
        <div className="score">
          <div className="">Score</div>
          <div>Score</div>
        </div>
        <div className="difficulty">
          <div className="">Difficulty</div>
          <div>easy</div>
        </div>
        <div className="time">
          <div className="">Time</div>
          <div>time</div>
        </div>
        <button className="new-game">New Game</button>
      </div>
    </div>
  );
};

export default Congrats;
