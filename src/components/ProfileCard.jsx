import { Link } from "react-router-dom";
const ProfileCard = ({ name, username, _id }) => {
    return (
        <Link to={`/profile/${_id}`}>
            <div>
                Name: {name}
                Username: {username}
            </div>
        </Link>
    );
};

export default ProfileCard;
