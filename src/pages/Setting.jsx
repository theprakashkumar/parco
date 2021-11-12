import "./Setting.css";
import { useState } from "react";
import useImage from "../hooks/useImage";
import { useSelector } from "react-redux";
import usePhotoUpload from "../hooks/usePhotoUpload";
import { updateUser } from "../features/auth/request";
import { useDispatch } from "react-redux";

const Setting = () => {
    const {
        user: { _id, name, profilePhoto, username, description },
    } = useSelector((state) => state.auth);
    const photoLink = useImage(profilePhoto, name);

    const [newPhoto, setNewPhoto] = useState("");
    const { newPhotoLink } = usePhotoUpload(newPhoto);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                userId: _id,
                name: userDetails.name,
                username: userDetails.username,
                description: userDetails.description,
                profilePhoto: newPhotoLink || "",
            })
        );
    };
    return (
        <div className="setting">
            {/* User Details Setting */}
            <div className="setting__user-setting">
                <form onSubmit={handleSubmit}>
                    <img
                        src={newPhotoLink ? newPhotoLink : photoLink}
                        className="setting__user-setting__photo"
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
                        Update
                    </button>
                </form>
            </div>
            {/* Password Reset */}
        </div>
    );
};

export default Setting;
