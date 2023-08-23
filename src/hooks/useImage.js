// Custom Hook to Get Profile Photo
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useImage = (imageLink, name) => {
  const [image, setImage] = useState("");
  const { profileStatus } = useSelector((state) => state.profile);
  const { postStatus } = useSelector((state) => state.post);
  const { userStatus } = useSelector((state) => state.explore);

  const getImageLink = () => {
    if (
      profileStatus === "fulfilled" ||
      profileStatus === "userUpdated" ||
      postStatus === "receivedFeed" ||
      userStatus === "receivedExplore" ||
      postStatus === "receivedSingPost"
    ) {
      const nameInitial = name[0];
      const profileImage = imageLink
        ? imageLink
        : `https://ui-avatars.com/api/?name=${nameInitial}`;
      setImage(profileImage);
    }
  };

  useEffect(() => {
    getImageLink();
    // eslint-disable-next-line
  }, []);
  return image;
};

export default useImage;
