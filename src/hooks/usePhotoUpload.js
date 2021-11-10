import { useEffect, useState } from "react";
import getPhotoLink from "../utils/getPhotoLink";

const usePhotoUpload = (photo) => {
    const [newPhotoLink, setNewPhotoLink] = useState("");

    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const CLOUD_URL = process.env.REACT_APP_CLOUD_URL;
    const PRESET = process.env.REACT_APP_PRESET;

    const getNewPhotoLink = async () => {
        const photoLink = await getPhotoLink(
            PRESET,
            CLOUD_NAME,
            CLOUD_URL,
            photo
        );
        setNewPhotoLink(photoLink);
    };

    useEffect(() => {
        getNewPhotoLink();
    }, [photo]);

    return { newPhotoLink };
};

export default usePhotoUpload;
