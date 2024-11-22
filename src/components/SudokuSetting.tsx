import {
  faArrowRotateLeft,
  faEraser,
  faLightbulb,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setHint } from "../states/hint";
import { RootState } from "../states/store";

const SudokuSetting = () => {
  const hint = useSelector((state: RootState) => state.hint.hint);
  const dispatch = useDispatch();
  return (
    <div className="sudoku-setting-container">
      <ul className="sudoku-setting-icons">
        <div className="icon-container">
          <li>
            <FontAwesomeIcon
              icon={faArrowRotateLeft}
              size="2xl"
              style={{ color: "#325aaf" }}
            />
          </li>
          <div className="caption">Undo</div>
        </div>
        <div className="icon-container">
          <li>
            <FontAwesomeIcon
              icon={faEraser}
              size="2xl"
              style={{ color: "#325aaf" }}
            />
          </li>
          <div className="caption">Erase</div>
        </div>
        <div className="icon-container">
          <li>
            <FontAwesomeIcon
              icon={faPencil}
              size="2xl"
              style={{ color: "#325aaf" }}
            />
          </li>
          <div className="caption">Notes</div>
        </div>
        <div className="icon-container">
          <li className="hint" onClick={() => dispatch(setHint())}>
            <FontAwesomeIcon
              icon={faLightbulb}
              size="2xl"
              style={{ color: "#325aaf" }}
            />
            <div className="hint-number">{hint}</div>
          </li>
          <div className="caption">Hint</div>
        </div>
      </ul>
    </div>
  );
};

export default SudokuSetting;
