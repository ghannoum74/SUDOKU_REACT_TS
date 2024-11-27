import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SudokuSetting = () => {
  return (
    <div className="sudoku-setting-container">
      <ul className="sudoku-setting-icons">
        <div className="header-box">
          <h3 className="header">Leader Board</h3>
          <FontAwesomeIcon
            icon={faCrown}
            style={{ color: "#ffffff", fontSize: "2rem" }}
          />
        </div>
      </ul>
    </div>
  );
};

export default SudokuSetting;
