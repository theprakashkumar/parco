import { getUsers } from "../features/explore/request";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";

const Explore = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.explore);
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
                      (user.name.includes(input) ||
                          user.username.includes(input))
              )
            : users.filter((user) => user._id !== userId);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={inputHandler}
                placeholder="Search People"
            />
            {exploreFeed?.map((user) => (
                <ProfileCard {...user} />
            ))}
        </div>
    );
};

export default Explore;
