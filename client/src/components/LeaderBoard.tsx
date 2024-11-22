import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type usersType = {
  username: string;
  score: number;
  level: string;
  time: string;
  profileImg: string;
};

const LeaderBoard = () => {
  const [users, setUsers] = useState<usersType[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const getUsers = async () => {
    setIsPending(true);
    try {
      const result = await axios.get("http://localhost:3000/getUsers");

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
      <div className="users-container">
        {isPending && <span className="loader"></span>}
        {users.length > 0 ? (
          users.map((user, index) => (
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
