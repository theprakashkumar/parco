import "./ProfileCard.css";
import { Link } from "react-router-dom";
import useImage from "../hooks/useImage";
import useFollow from "../hooks/useFollow";

const ProfileCard = ({ name, username, _id, profilePhoto }) => {
    const imageLink = useImage(profilePhoto, name);
    const { isFollowed, followUnFollow } = useFollow(_id);
    return (
        <div className="profile-card">
            <img
                src={imageLink}
                alt="profile"
                className="profile-card__profile-photo"
            />
            <Link to={`/profile/${_id}`}>
                <div className="profile-card__name-container ml-1">
                    <div className="profile-card__name heading heading--h6">
                        {name}
                    </div>
                    <div className="profile-card__username">@{username}</div>
                </div>
            </Link>
            <button onClick={followUnFollow} className="btn profile-card__btn">
                {isFollowed ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
};

export default ProfileCard;
