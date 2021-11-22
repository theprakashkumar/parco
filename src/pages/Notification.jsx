import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotification } from "../features/notification/request";

const Notification = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNotification());
    }, []);
    return <div>Notification</div>;
};

export default Notification;
