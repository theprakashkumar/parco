import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProfile } from "../features/profile/request";
import Post from "../components/Post";

const Profile = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const { isUserLoggedIn } = useSelector((state) => state.auth);
    const { profileStatus } = useSelector((state) => state.profile);
    const { profile } = useSelector((state) => state.profile);
    const { post } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getProfile({ userId }));
    }, []);

    return (
        <div>
            {profileStatus === "pending" ? (
                <div>Loading</div>
            ) : (
                <div>
                    Profile {userId} {profile.name}
                    {post.map((post) => (
                        <Post {...post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
