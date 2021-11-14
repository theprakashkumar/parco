import NewPost from "../components/NewPost";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../features/post/request";
import { useEffect } from "react";

const Feed = () => {
    const dispatch = useDispatch();
    const { feedPost, postStatus } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getFeed());
    }, []);
    return (
        <div className="feed">
            {postStatus === "pending" ? (
                <p>Loading</p>
            ) : (
                <>
                    <NewPost />
                    {feedPost.map((post) => (
                        <Post {...post} />
                    ))}
                </>
            )}
        </div>
    );
};

export default Feed;
