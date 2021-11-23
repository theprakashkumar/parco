import "./Post.css";
import useImage from "../hooks/useImage";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import isAlreadyLiked from "../utils/isAlreadyLiked";
import timeAgo from "../utils/timeAgo";
import {
    commentPost,
    likePost,
    removeLikePost,
} from "../features/post/request";

const Post = ({
    user: { name, username, profilePhoto },
    _id: postId,
    caption,
    photo,
    time,
    likes,
    comment,
}) => {
    const dispatch = useDispatch();
    const [commenting, setCommenting] = useState(false);
    const [content, setContent] = useState("");

    const { userId } = useSelector((state) => state.auth);

    const imageLink = useImage(profilePhoto, name);

    const isLiked = isAlreadyLiked(likes, userId);

    const handleLike = () => {
        if (!isLiked) {
            dispatch(likePost({ postId }));
        } else {
            dispatch(removeLikePost({ postId }));
        }
    };

    const handleComment = (e) => {
        e.preventDefault();
        dispatch(commentPost({ postId, content }));
        setCommenting(false);
        setContent("");
    };

    return (
        <div className="post">
            <div className="post__top-section">
                <img
                    src={imageLink}
                    alt="profile"
                    className="post__top-section__profile"
                />
                <div className="post__top-section__name-container ml-1">
                    <div className="post__top-section__name">{name}</div>
                    <div className="post__top-section__username">
                        @{username}
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
                        {likes.length === 0 ? "" : `${likes.length} likes`}
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
            {comment.map((com) => (
                <p>{com.content}</p>
            ))}
            <div className="post__comment mt-1">
                {commenting && (
                    <form onSubmit={handleComment}>
                        <textarea
                            className="post__comment__textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <button className="post__comment__btn">Comment</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Post;
