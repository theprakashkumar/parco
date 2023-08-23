import "./EmptyNotification.css";
import { Link } from "react-router-dom";
import emptyNotification from "../assets/no_notification.svg";
const EmptyNotification = () => {
  return (
    <div className="empty-notification flex flex-dir-cl flex-align-center">
      <div className="heading--h5 mb-1">Notification</div>
      <img
        className="empty-notification__image"
        src={emptyNotification}
        alt="empty notification Logo"
      />
      <div className="heading--h5">I am empty :(</div>
      <div>Your Notification is Empty</div>
      <Link className="btn btn--link link" to="/">
        Go to Feed
      </Link>
    </div>
  );
};

export default EmptyNotification;
