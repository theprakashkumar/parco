import NewPost from "../components/NewPost";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../features/post/request";
import { useEffect } from "react";
import Loader from "../components/Loader";

const Feed = () => {
    const dispatch = useDispatch();
    const { feedPost, postStatus } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getFeed());
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
