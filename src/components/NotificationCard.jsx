import { Link } from "react-router-dom";
import "./NotificationCard.css";
import timeAgo from "../utils/timeAgo";

const NotificationCard = ({
    notificationType,
    sourceUser: { _id, name },
    targetUser,
    time,
    post,
}) => {
    const notificationText = () => {
        if (notificationType === "LIKE") {
            return "liked your";
        } else if (notificationType === "COMMENT") {
            return "commented on your";
        } else {
            return "started following you";
        }
    };

    return (
        <div className="notification-card">
            <div className="notification-card__left">
                <Link className="btn btn--link" to={`/profile/${_id}`}>
                    {name}
                </Link>
                <span> {notificationText()} </span>

                <Link className="btn btn--link" to={`/feed/${post}`}>
                    {notificationType === "COMMENT" ||
                    notificationType === "LIKE"
                        ? "post"
                        : ""}
                </Link>
            </div>
            <div className="notification-card--right">{`${timeAgo(
                time
            )} ago`}</div>
        </div>
    );
};

export default NotificationCard;
