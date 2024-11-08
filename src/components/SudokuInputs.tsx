const SudokuInputs = () => {
  const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="sudoku-inputs-container">
      <ul className="number-container">
        {numbers.map((val, key) => (
          <li key={key}>{val}</li>
        ))}
        <li className="new-game">New Game</li>
      </ul>
    </div>
  );
};

export default SudokuInputs;
