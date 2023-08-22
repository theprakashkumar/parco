import "./Explore.css";
import { getUsers } from "../features/explore/request";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import Loader from "../components/Loader";

const Explore = () => {
  const dispatch = useDispatch();
  const { users, userStatus } = useSelector((state) => state.explore);
  const { userId } = useSelector((state) => state.auth);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const exploreFeed =
    input !== ""
      ? users.filter(
          (user) =>
            user._id !== userId &&
            (user.name.includes(input) || user.username.includes(input))
        )
      : users.filter((user) => user._id !== userId);

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="explore">
      <div className="explore__input-container">
        <input
          type="text"
          value={input}
          onChange={inputHandler}
          placeholder="Search People"
          className="explore__input"
        />
      </div>
      {userStatus === "pendingExplore" ? (
        <Loader />
      ) : (
        <div className="explore__user-container">
          {exploreFeed?.map((user) => (
            <ProfileCard {...user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
