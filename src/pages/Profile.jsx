import "./Profile.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProfile } from "../features/profile/request";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import useImage from "../hooks/useImage";
import { logout } from "../features/auth/authSlice";
import useFollow from "../hooks/useFollow";

const Profile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const { userId: loggedInUser } = useSelector((state) => state.auth);
    const { profileStatus } = useSelector((state) => state.profile);
    const {
        profile: { name, profilePhoto, username, description },
    } = useSelector((state) => state.profile);
    const { post } = useSelector((state) => state.profile);

    const imageLink = useImage(profilePhoto, name);
    const { handleFollow, handleUnFollow, isFollowed } = useFollow(userId);

    useEffect(() => {
        dispatch(getProfile({ userId }));
    }, [userId]);

    return (
        <div>
            {profileStatus === "pending" ? (
                <div>Loading</div>
            ) : (
                <div>
                    {/* Profile Header */}
                    <div className="profile-header">
                        <img
                            src={imageLink}
                            className="profile-header__photo"
                        />
                        <div className="heading heading--h6 mt-0-5">{name}</div>
                        <div className="profile-header__username">
                            @{username}
                        </div>
                        <div className="profile-header__description">
                            {description}
                        </div>
                        <div className="profile-header__button-container mt-1">
                            {userId === loggedInUser ? (
                                <>
                                    <Link
                                        className="btn profile-header__button-edit"
                                        to={`/profile/${userId}/setting`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn profile-header__button-logout ml-1"
                                        onClick={() => dispatch(logout())}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn"
                                        onClick={
                                            isFollowed
                                                ? () => handleUnFollow(userId)
                                                : () => handleFollow(userId)
                                        }
                                    >
                                        {isFollowed ? "Unfollow" : "Follow"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Post */}
                    {post.map((post) => (
                        <Post {...post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
