import "./Post.css";
import usePhoto from "../hooks/usePhoto";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import isAlreadyLiked from "../utils/isAlreadyLiked";
import timeAgo from "../utils/timeAgo";
import {
    likePost,
    removeLikePost,
    commentPost,
} from "../features/post/request";

import {
    profileLike,
    profileRemoveLike,
    profileComment,
} from "../features/profile/request";

const Post = ({
    user: { _id, name, username, profilePhoto },
    _id: postId,
    caption,
    photo,
    time,
    likes,
    comment,
    page,
}) => {
    const dispatch = useDispatch();
    const [commenting, setCommenting] = useState(false);
    const [content, setContent] = useState("");

    const { userId } = useSelector((state) => state.auth);

    const photoLink = usePhoto(profilePhoto, name);

    const isLiked = isAlreadyLiked(likes, userId);

    const handleLike = () => {
        if (page === "FEED") {
            if (!isLiked) {
                dispatch(likePost({ postId }));
            } else {
                dispatch(removeLikePost({ postId }));
            }
        } else {
            if (!isLiked) {
                dispatch(profileLike({ postId }));
            } else {
                dispatch(profileRemoveLike({ postId }));
            }
        }
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (page === "FEED") {
            dispatch(commentPost({ postId, content }));
        } else {
            dispatch(profileComment({ postId, content }));
        }
        setCommenting(false);
        setContent("");
    };

    return (
        <div className="post">
            <div className="post__top-section">
                <img
                    src={photoLink}
                    alt="profile"
                    className="post__top-section__profile"
                />
                <div className="post__top-section__name-container ml-1">
                    <div className="post__top-section__name">{name}</div>
                    <div className="post__top-section__username">
                        <Link to={`/profile/${_id}`}>@{username}</Link>
                    </div>
                </div>
                <div className="post__top-section__time">
                    {timeAgo(time)} ago
                </div>
            </div>
            <div className="post__post">
                <div className="post__post__caption mt-1 mb-1">{caption}</div>
                <div className="post__post__photo-container">
                    {photo && (
                        <img
                            src={photo}
                            className="post__post__photo"
                            alt="post"
                        />
                    )}
                </div>
            </div>
            <div className="post__controllers mt-1">
                <button className="post__controllers__btn">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 20 24"
                        fill={isLiked ? "#f87171" : "#0f172a"}
                        xmlns="http://www.w3.org/2000/svg"
                        className="post__controllers__btn__svg"
                        onClick={handleLike}
                    >
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"></path>
                    </svg>
                    <span className="ml-1">
                        {likes.length === 0
                            ? ""
                            : likes.length === 1
                            ? "1 like"
                            : `${likes.length} likes`}
                    </span>
                </button>
                <button className="post__controllers__btn">
                    <span
                        class="material-icons-round"
                        onClick={() => setCommenting(!commenting)}
                    >
                        mode_comment
                    </span>
                </button>
            </div>
            <div className="post__comment mt-1">
                {comment &&
                    comment.map((com) => (
                        <div>
                            <span className="post__comment__user mr-1">
                                <Link to={`/profile/${com.user._id}`}>
                                    {com.user.username}
                                </Link>
                            </span>
                            <span className="post__comment__content">
                                {com.content}
                            </span>
                        </div>
                    ))}
            </div>

            {commenting && (
                <div className="post__comment mt-1">
                    <form onSubmit={handleComment}>
                        <textarea
                            className="post__comment__textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <button className="post__comment__btn">Comment</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Post;
