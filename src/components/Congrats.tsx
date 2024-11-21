import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import React, { useEffect, useState } from "react";
import { getTimer, pause } from "../states/timer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Congrats = () => {
  const defaultProfile =
    "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg";
  const score = useSelector((state: RootState) => state.score.score);
  const level = useSelector((state: RootState) => state.score.level);
  const getTime = useSelector(getTimer);
  const fullSudokuShape = useSelector(
    (state: RootState) => state.setSolvedData.solvedBoardData
  );
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePostData = async () => {
    try {
      const result = await axios.post("http://localhost:3000/addScore", {
        username: name,
        score: score,
        level: level,
        time: getTime,
        profileImage: imageSrc,
      });
      if (result.status === 200) {
        console.log(result);
        toast.success("Welcome the the leader board :)", {
          hideProgressBar: true,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);

        return;
      }
      // console.log(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data) {
        toast.error("username already existing :(", {
          hideProgressBar: true,
        });
      } else {
        toast.success("An Error Occured!", {
          hideProgressBar: true,
        });
      }
    }
    // location.reload();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // pause the timer
    dispatch(pause());
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="congrat-container">
        <div className="left-side">
          <img src="https://sudoku.com/img/rays.png" />
          <h1>Excellent!</h1>
          <div className="outline-table">
            <div className="table-shape">
              {fullSudokuShape.map((row, key) => (
                <div key={key} id={`${key}`} className="tr">
                  {row.map((cell, key) => (
                    <div key={key} id={cell.id} className="td">
                      <div id={cell.id}>{cell.value}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="profile-picture">
            <img src={imageSrc ? imageSrc : defaultProfile} alt="Profile" />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="name-id">
            <div>Name</div>
            <div className="name-place">
              <input type="text" autoFocus onChange={handleInput} />
            </div>
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
              <div>{getTime}</div>
            </div>
          </div>
          <div className="btns">
            <button
              className="new-game save"
              onClick={handlePostData}
              style={{
                cursor: `${
                  RegExp("^.{3,}$").test(name.trim())
                    ? "pointer"
                    : "not-allowed"
                }`,
              }}
              disabled={RegExp("^.{3,}$").test(name.trim()) ? false : true}
            >
              Save Your Record
            </button>
            <button className="new-game" onClick={() => location.reload()}>
              New Game
            </button>
          </div>
          {/* {newGame && <DifficultuMenu newGame={newGame} />} */}
        </div>
      </div>
    </>
  );
};

export default Congrats;
