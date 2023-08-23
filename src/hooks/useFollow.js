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
    dispatch(follow(userId));
  };

  const handleUnFollow = () => {
    dispatch(unFollow(userId));
  };

  const followUnFollow = () => {
    if (isFollowed) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const isUserFollowed = () => {
    const inFollowing = following.includes(userId);
    if (inFollowing) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  };

  useEffect(() => {
    isUserFollowed();
    // eslint-disable-next-line
  }, [following]);

  return { handleFollow, handleUnFollow, isFollowed, followUnFollow };
};

export default useFollow;
