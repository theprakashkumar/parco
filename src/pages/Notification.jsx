import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "../components/NotificationCard";
import Loader from "../components/Loader";
import { getNotification } from "../features/notification/request";

const Notification = () => {
    const dispatch = useDispatch();
    const { notifications, notificationStatus } = useSelector(
        (state) => state.notification
    );
    useEffect(() => {
        dispatch(getNotification());
    }, []);
    return (
        <div>
            {notificationStatus === "pending" ? (
                <Loader />
            ) : (
                <div className="notification-container">
                    {notifications.map((notification) => (
                        <NotificationCard {...notification} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;
