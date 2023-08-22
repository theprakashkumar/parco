import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "../components/NotificationCard";
import Loader from "../components/Loader";
import { getNotification } from "../features/notification/request";
import EmptyNotification from "../components/EmptyNotification";

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, notificationStatus } = useSelector(
    (state) => state.notification
  );
  useEffect(() => {
    dispatch(getNotification());
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {notificationStatus === "pending" ? (
        <Loader />
      ) : (
        <div className="notification-container">
          {notifications.length === 0 ? (
            <EmptyNotification />
          ) : (
            notifications.map((notification) => (
              <NotificationCard {...notification} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
