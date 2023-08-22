import "./Feed.css";
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../features/post/request";
import { useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const Feed = () => {
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const { feedPost, postStatus } = useSelector((state) => state.post);

  useEffect(() => {
    if (isUserLoggedIn) {
      // setting the header again here because when the user new login/signup their token will be changed so we have set it again.
      axios.defaults.headers.common["authorization"] = JSON.parse(
        localStorage.getItem("token")
      );
      dispatch(getFeed());
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="feed">
      {postStatus !== "getFeedPending" ? (
        <>
          <NewPost />
          {feedPost.length === 0 ? (
            <div className="feed__no-post">
              <h2 className="feed__no-title">No Post Yet!</h2>
              <p className="feed__no-emoji mt-1">\(o_o)/</p>
            </div>
          ) : (
            feedPost.map((post) => (
              <Post {...post} page="FEED" key={post._id} />
            ))
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Feed;
