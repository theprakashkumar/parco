import { useSelector } from "react-redux";
const Profile = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth);

    return <div>Profile{isUserLoggedIn.toString()}</div>;
};

export default Profile;
