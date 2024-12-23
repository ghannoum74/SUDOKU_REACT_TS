import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../states/store";

type usersType = {
  username: string;
  score: number;
  level: string;
  time: string;
  profileImg: string;
};

const convertToSeconds = (userTime: string) => {
  const [hours, minutes, seconds] = userTime.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const LeaderBoard = () => {
  const [users, setUsers] = useState<usersType[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const difficultyState = useSelector(
    (state: RootState) => state.chosingDifficulty.difficulty
  );
  const getUsers = async () => {
    setIsPending(true);
    try {
      const result = await axios.get(
        "https://sudoku-react-ts.onrender.com/getUsers"
      );

      if (result) {
        setUsers(result.data);
      }
    } catch (error) {
      if (error) {
        toast.error("An Error Occured :(", {
          hideProgressBar: true,
        });
      }
    } finally {
      setIsPending(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="sorting-bar-container">
      <div
        className={`users-container ${
          difficultyState === "custom" ? "custom" : ""
        }`}
      >
        {isPending && <span className="loader"></span>}
        {users.length > 0 ? (
          users
            .sort((a, b) => convertToSeconds(a.time) - convertToSeconds(b.time))
            .map((user, index) => (
              <div className="each-user" key={index}>
                <div className="walpaper">
                  <img alt="walpaper" src={user.profileImg} />
                </div>
                <div className="description">
                  <div className="username">
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </div>
                </div>

                <div className="container-time">
                  <div className="user-time">{user.time}</div>
                  {/* <div className="user-score">{user.score}</div> */}
                </div>
              </div>
            ))
        ) : (
          <></>
          // <h3 className="rotingtxt">No data available</h3>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
