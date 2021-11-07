// Custom hook of follow/unfollow user

import { useEffect, useState } from "react";
import { follow, unFollow } from "../features/auth/request";
import { useSelector, useDispatch } from "react-redux";

const useFollow = (userId) => {
    const dispatch = useDispatch();
    const {
        user: { following },
    } = useSelector((state) => state.auth);
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollow = () => {
        console.log(userId);
        dispatch(follow(userId));
    };

    const handleUnFollow = () => {
        dispatch(unFollow(userId));
    };

    const isUserFollowed = () => {
        const inFollowing = following.includes(userId);
        console.log("is", inFollowing, following);
        if (inFollowing) {
            setIsFollowed(true);
        } else {
            setIsFollowed(false);
        }
    };

    useEffect(() => {
        isUserFollowed();
    }, [following]);

    return { handleFollow, handleUnFollow, isFollowed };
};

export default useFollow;
