import NewPost from "../components/NewPost";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuthUser } from "../features/auth/request";
import { getFeed } from "../features/post/request";
import { useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const Feed = () => {
    const dispatch = useDispatch();
    const { userId, isUserLoggedIn } = useSelector((state) => state.auth);
    const { feedPost, postStatus } = useSelector((state) => state.post);

    useEffect(() => {
        if (isUserLoggedIn) {
            axios.defaults.headers.common["authorization"] = JSON.parse(
                localStorage.getItem("token")
            );
            dispatch(initializeAuthUser(userId));
            dispatch(getFeed());
        }
    }, []);
    return (
        <div className="feed">
            {postStatus !== "getFeedPending" ? (
                <>
                    <NewPost />
                    {feedPost.map((post) => (
                        <Post {...post} page="FEED" />
                    ))}
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Feed;
