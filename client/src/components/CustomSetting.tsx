import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { setSolvedData } from "../states/SolvedBoardData";
import { solveCustomBoard } from "../states/solveCustomBoard";

const CustomSetting = () => {
  const currentBoard = useSelector(
    (state: RootState) => state.setSolvedData.solvedBoardData
  );

  // const difficulty = useSelector(
  //   (state: RootState) => state.chosingDifficulty.difficulty
  // );
  const dispatch = useDispatch();

  const solveManualSudoku = () => {
    const clonedBoard = JSON.parse(JSON.stringify(currentBoard));
    // solveSudoku(clonedBoard);
    dispatch(setSolvedData(clonedBoard));
    dispatch(solveCustomBoard(true));
  };
  return (
    <div className="custom-setting">
      <div className="img">
        <input type="file" id="customFileInput" style={{ display: "none" }} />
        <label htmlFor="customFileInput">Upload image</label>
      </div>
      <button className="solve" onClick={solveManualSudoku}>
        Solve
      </button>
    </div>
  );
};

export default CustomSetting;
