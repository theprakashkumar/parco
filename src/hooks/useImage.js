// Custom Hook to Get Profile Photo
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useImage = (imageLink, name) => {
    const [image, setImage] = useState("");
    const { profileStatus } = useSelector((state) => state.profile);

    const getImageLink = () => {
        if (profileStatus === "fulfilled" || profileStatus === "userUpdated") {
            const nameInitial = name[0];
            const profileImage = imageLink
                ? imageLink
                : `https://ui-avatars.com/api/?name=${nameInitial}`;
            setImage(profileImage);
        }
    };

    useEffect(() => {
        getImageLink();
    }, [profileStatus, imageLink]);
    return image;
};

export default useImage;
