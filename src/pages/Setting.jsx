import "./Setting.css";
import { useState } from "react";
import usePhoto from "../hooks/usePhoto";
import { useSelector } from "react-redux";
import { updateUser } from "../features/auth/request";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import uploadPhoto from "../utils/uploadPhoto";
import { useRef } from "react";

const Setting = () => {
    const {
        user: { _id, name, profilePhoto, username, description },
        status,
    } = useSelector((state) => state.auth);
    const photoLink = usePhoto(profilePhoto, name);

    const [newPhoto, setNewPhoto] = useState("");
    const [newPhotoLink, setNewPhotoLink] = useState("");

    const [userDetails, setUserDetails] = useState({
        name,
        username,
        description,
    });

    const dispatch = useDispatch();

    const handlePhoto = (e) => {
        setNewPhoto(e.target.files[0]);
    };

    const handleChange = (e) => {
        setUserDetails((userDetails) => ({
            ...userDetails,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const changedProfilePhoto = newPhotoLink
            ? newPhotoLink
            : profilePhoto
            ? profilePhoto
            : "";
        await dispatch(
            updateUser({
                userId: _id,
                name: userDetails.name,
                username: userDetails.username,
                description: userDetails.description,
                profilePhoto: changedProfilePhoto,
            })
        );
    };

    // this is to not run useEffect when component mounted
    const didNotMount = useRef(false);
    useEffect(() => {
        const updateNewPhotoLink = async () => {
            if (didNotMount.current) {
                const uploadedPhotoLink = await uploadPhoto(newPhoto);
                setNewPhotoLink(uploadedPhotoLink);
            } else {
                didNotMount.current = true;
            }
        };
        updateNewPhotoLink();
    }, [newPhoto]);
    return (
        <div className="setting">
            {/* User Details Setting */}
            <div className="setting__user-setting">
                <form onSubmit={handleSubmit}>
                    <img
                        src={newPhotoLink ? newPhotoLink : photoLink}
                        className="setting__user-setting__photo"
                        alt="new-profile"
                    />
                    <label className="btn btn--icon btn--sm setting__user-setting__upload-btn">
                        <span class="material-icons-round btn--icon__icon">
                            file_upload
                        </span>
                        Upload
                        <input
                            type="file"
                            hidden
                            onChange={handlePhoto}
                        ></input>
                    </label>

                    <div class="input-text-wrapper mb-1">
                        <input
                            class="input-text  input-text-full-name"
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="input-text-wrapper mb-1">
                        <input
                            class="input-text  input-text-username"
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={userDetails.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="input-text-wrapper">
                        <input
                            class="input-text input-text-description"
                            type="input"
                            placeholder="Bio"
                            name="description"
                            value={userDetails.description}
                            onChange={handleChange}
                        />
                    </div>
                    <button class="btn btn--lg mt-1 setting__user-setting__update-btn">
                        {status === "updatingUser" ? "Updating" : "Update"}
                    </button>
                </form>
            </div>
            {/* Password Reset */}
        </div>
    );
};

export default Setting;
