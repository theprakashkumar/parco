// Custom Hook to Get Profile Photo
import { useEffect, useState } from "react";

const usePhoto = (imageLink, name) => {
    const [image, setImage] = useState("");

    const getImageLink = () => {
        const nameInitial = name[0];
        const profileImage = imageLink
            ? imageLink
            : `https://ui-avatars.com/api/?name=${nameInitial}`;
        setImage(profileImage);
    };

    useEffect(() => {
        getImageLink();
    }, []);
    return image;
};

export default usePhoto;
